import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, ArrowRight, Mail, Lock, AlertCircle, X } from 'lucide-react';
import loginIllustration from '../assets/login_illustration.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    loginUser,
    forceLoginUser,
    clearError,
    clearActiveSessionConflict,
} from '../features/auth/authSlice';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, activeSessionConflict } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) navigate(from, { replace: true });
    };

    const handleForceLogin = async () => {
        if (!activeSessionConflict) return;
        const result = await dispatch(forceLoginUser({ email, password, session_id: activeSessionConflict.sessionId }));
        if (forceLoginUser.fulfilled.match(result)) navigate(from, { replace: true });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0},
        visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-white">
            {/* Left — Form Panel */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full lg:w-[38%] flex flex-col items-center justify-center px-8 sm:px-12 xl:px-16 py-12 relative z-10 bg-white"
            >
                {/* Logo */}
                <div
                    className="mb-10"
                >
                    <a href="/" className="inline-block">
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="kruit.ai"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-sm w-full"
                >
                    <motion.div variants={itemVariants} className="mb-8 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back</h1>
                        <p className="text-gray-500 text-sm">Sign in to your kruit.ai account</p>
                    </motion.div>

                    {/* Active session conflict prompt */}
                    {activeSessionConflict && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm text-amber-800"
                        >
                            <p className="font-semibold mb-1">Active session detected</p>
                            <p className="text-xs mb-3">You already have an active session on another device. Sign out of that session and continue here?</p>
                            <div className="flex gap-2">
                                <Button type="button" size="sm" onClick={handleForceLogin} disabled={loading} className="text-xs h-8 bg-amber-600 hover:bg-amber-700">
                                    {loading ? 'Signing in…' : 'Yes, sign out other session'}
                                </Button>
                                <Button type="button" size="sm" variant="ghost" onClick={() => dispatch(clearActiveSessionConflict())} className="text-xs h-8">
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Error banner */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-2 flex items-start gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700"
                        >
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span className="flex-1">{error}</span>
                            <button type="button" onClick={() => dispatch(clearError())} className="shrink-0 hover:text-red-900">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Email field */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <motion.div
                                animate={{
                                    borderColor: focusedField === 'email'
                                        ? 'oklch(0.5635 0.2408 260.82)'
                                        : 'oklch(0.922 0 0)',
                                    boxShadow: focusedField === 'email'
                                        ? '0 0 0 3px oklch(0.5635 0.2408 260.82 / 0.15)'
                                        : '0 0 0 0px transparent'
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50"
                            >
                                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Password field */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline font-medium">
                                    Forgot password?
                                </a>
                            </div>
                            <motion.div
                                animate={{
                                    borderColor: focusedField === 'password'
                                        ? 'oklch(0.5635 0.2408 260.82)'
                                        : 'oklch(0.922 0 0)',
                                    boxShadow: focusedField === 'password'
                                        ? '0 0 0 3px oklch(0.5635 0.2408 260.82 / 0.15)'
                                        : '0 0 0 0px transparent'
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50"
                            >
                                <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                                />
                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword
                                        ? <EyeOff className="w-4 h-4" />
                                        : <Eye className="w-4 h-4" />}
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={itemVariants} className="pt-1">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    size="xl"
                                    className="w-full group"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in…' : (
                                        <>
                                            Sign In
                                            <motion.span
                                                className="ml-1 inline-flex"
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.span>
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>

            {/* Right — Illustration Panel */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:flex flex-1 relative overflow-hidden"
            >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-[#e7f7ff]" />

                {/* Illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                        className="w-full"
                    >
                        <img
                            src={loginIllustration}
                            alt="Login illustration"
                            className="w-full h-auto "
                        />
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="mt-10 flex items-center gap-6 text-xs text-gray-500"
                    >
                        {['60% faster hiring', '50%+ fewer false positives', '<30 days to hire'].map((badge) => (
                            <span key={badge} className="flex items-center gap-1.5 bg-white backdrop-blur-sm px-3 py-1.5 rounded-full border border-white shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                {badge}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
