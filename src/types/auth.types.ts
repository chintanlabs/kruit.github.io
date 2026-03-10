export type UserRole = 'ADMIN' | 'RECRUITER' | 'VIEWER';

export interface User {
    id: string;
    name: string;
    email: string;
    organization_id: string;
    role: UserRole;
    is_active: boolean;
    created_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForceLoginRequest {
    email: string;
    password: string;
    session_id: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: User;
}

export interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type: string;
}

export interface ActiveSessionConflict {
    sessionId: string;
}

export interface AuthState {
    user: Partial<User> | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    activeSessionConflict: ActiveSessionConflict | null;
}
