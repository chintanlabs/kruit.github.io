import type { LoginRequest, ForceLoginRequest, TokenResponse, RefreshTokenResponse, User } from '../types/auth.types';
import { config } from '../config';

export class ActiveSessionConflictError extends Error {
    readonly sessionId: string;
    constructor(sessionId: string) {
        super('active_session_exists');
        this.name = 'ActiveSessionConflictError';
        this.sessionId = sessionId;
    }
}

const AUTH_API_BASE_URL = config.authApiBaseUrl;

const AUTH_ENDPOINTS = {
    LOGIN: `${AUTH_API_BASE_URL}/api/v1/auth/login`,
    FORCE_LOGIN: `${AUTH_API_BASE_URL}/api/v1/auth/login/force`,
    REFRESH: `${AUTH_API_BASE_URL}/api/v1/auth/refresh`,
    LOGOUT: `${AUTH_API_BASE_URL}/api/v1/auth/logout`,
    ME: `${AUTH_API_BASE_URL}/api/v1/auth/me`,
};

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenStorage = {
    getAccessToken: (): string | null => localStorage.getItem(TOKEN_KEY),
    getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
    setTokens: (accessToken: string, refreshToken: string) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },
    clearTokens: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
};

export const getAuthHeaders = (): Record<string, string> => {
    const token = tokenStorage.getAccessToken();
    return token
        ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        : { 'Content-Type': 'application/json' };
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        if (response.status === 409 && error?.detail?.code === 'active_session_exists') {
            throw new ActiveSessionConflictError(error.detail.session_id);
        }
        throw new Error(error.detail || error.message || `HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) return {} as T;
    return response.json();
}

export const authService = {
    login: async (data: LoginRequest): Promise<TokenResponse> => {
        const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await handleResponse<TokenResponse>(response);
        tokenStorage.setTokens(result.access_token, result.refresh_token);
        return result;
    },

    forceLogin: async (data: ForceLoginRequest): Promise<TokenResponse> => {
        const response = await fetch(AUTH_ENDPOINTS.FORCE_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await handleResponse<TokenResponse>(response);
        tokenStorage.setTokens(result.access_token, result.refresh_token);
        return result;
    },

    refreshToken: async (): Promise<RefreshTokenResponse> => {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');
        const response = await fetch(AUTH_ENDPOINTS.REFRESH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
        const result = await handleResponse<RefreshTokenResponse>(response);
        localStorage.setItem(TOKEN_KEY, result.access_token);
        if (result.refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, result.refresh_token);
        return result;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await fetch(AUTH_ENDPOINTS.ME, { headers: getAuthHeaders() });
        return handleResponse<User>(response);
    },

    logout: async (): Promise<void> => {
        const refreshToken = tokenStorage.getRefreshToken();
        if (refreshToken) {
            try {
                await fetch(AUTH_ENDPOINTS.LOGOUT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
            } catch { /* ignore */ }
        }
        tokenStorage.clearTokens();
    },
};
