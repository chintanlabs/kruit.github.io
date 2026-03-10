import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService, tokenStorage, ActiveSessionConflictError } from '../../services/auth.service';
import type {
    AuthState,
    LoginRequest,
    ForceLoginRequest,
    TokenResponse,
    User,
} from '../../types/auth.types';

type LoginRejectValue =
    | { type: 'active_session_exists'; sessionId: string }
    | { type: 'error'; message: string };

function getUserFromToken(token: string | null): Partial<User> | null {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.sub || payload.user_id || '',
            organization_id: payload.org_id || payload.organization_id || '',
            role: payload.role || 'VIEWER',
            name: payload.name || '',
            email: payload.email || '',
            is_active: true,
            created_at: '',
        } as User;
    } catch {
        return null;
    }
}

const initialToken = tokenStorage.getAccessToken();
const initialState: AuthState = {
    user: getUserFromToken(initialToken),
    accessToken: initialToken,
    refreshToken: tokenStorage.getRefreshToken(),
    isAuthenticated: !!initialToken,
    loading: false,
    error: null,
    activeSessionConflict: null,
};

export const loginUser = createAsyncThunk<
    TokenResponse,
    LoginRequest,
    { rejectValue: LoginRejectValue }
>('auth/login', async (data, { rejectWithValue }) => {
    try {
        return await authService.login(data);
    } catch (error) {
        if (error instanceof ActiveSessionConflictError) {
            return rejectWithValue({ type: 'active_session_exists', sessionId: error.sessionId });
        }
        return rejectWithValue({
            type: 'error',
            message: error instanceof Error ? error.message : 'Login failed',
        });
    }
});

export const forceLoginUser = createAsyncThunk<
    TokenResponse,
    ForceLoginRequest,
    { rejectValue: string }
>('auth/forceLogin', async (data, { rejectWithValue }) => {
    try {
        return await authService.forceLogin(data);
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Force login failed');
    }
});

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            return await authService.getCurrentUser();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
        }
    },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; },
        setUser: (state, action: PayloadAction<User>) => { state.user = action.payload; },
        clearActiveSessionConflict: (state) => { state.activeSessionConflict = null; },
        hydrateAuth: (state) => {
            const token = tokenStorage.getAccessToken();
            if (token) {
                state.accessToken = token;
                state.refreshToken = tokenStorage.getRefreshToken();
                state.isAuthenticated = true;
                const user = getUserFromToken(token);
                if (user) state.user = user;
            } else {
                state.isAuthenticated = false;
                state.user = null;
                tokenStorage.clearTokens();
            }
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.activeSessionConflict = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.isAuthenticated = true;
                state.activeSessionConflict = null;
                tokenStorage.setTokens(action.payload.access_token, action.payload.refresh_token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload;
                if (payload?.type === 'active_session_exists') {
                    state.activeSessionConflict = { sessionId: payload.sessionId };
                    state.error = null;
                } else {
                    state.error = payload?.type === 'error' ? payload.message : 'Login failed';
                    state.activeSessionConflict = null;
                }
            });

        // Force login
        builder
            .addCase(forceLoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forceLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.isAuthenticated = true;
                state.activeSessionConflict = null;
                tokenStorage.setTokens(action.payload.access_token, action.payload.refresh_token);
            })
            .addCase(forceLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Force login failed';
                state.activeSessionConflict = null;
            });

        // Fetch current user
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });

        // Logout
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.error = null;
                state.activeSessionConflict = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, setUser, hydrateAuth, clearActiveSessionConflict } = authSlice.actions;
export default authSlice.reducer;
