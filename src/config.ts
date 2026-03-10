/**
 * Runtime configuration utility.
 *
 * In production (Cloud Run), environment variables are injected as a JS file
 * at container startup via docker-entrypoint.sh → window.__env__.
 * In local development, Vite's import.meta.env is used as fallback.
 */

interface EnvConfig {
    VITE_AUTH_API_BASE_URL: string;
    VITE_RESUME_VETTING_URL: string;
}

declare global {
    interface Window {
        __env__?: Partial<EnvConfig>;
    }
}

const getEnv = (key: keyof EnvConfig, fallback: string): string =>
    window.__env__?.[key] || (import.meta.env[key] as string) || fallback;

export const config = {
    authApiBaseUrl: getEnv('VITE_AUTH_API_BASE_URL', 'http://localhost:8001'),
    resumeVettingUrl: getEnv('VITE_RESUME_VETTING_URL', 'http://localhost:5174'),
};
