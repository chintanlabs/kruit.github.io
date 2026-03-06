import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Send,
    CheckCircle2,
    Loader2,
    Mail,
    User,
    Phone,
    Building2,
    MessageSquare,
    Clock,
    Shield,
    Zap,
    ChevronRight,
} from 'lucide-react';

/* ─────────────────────── types ─────────────────────── */
interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

/* ─────────────────────── page ─────────────────────── */
export default function ContactUs() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', company: '', message: '' });
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const cloudRunUrl = import.meta.env.VITE_CLOUD_RUN_URL;

        if (!cloudRunUrl) {
            setStatus('error');
            setErrorMsg('Service endpoint not configured. Please set VITE_CLOUD_RUN_URL.');
            return;
        }

        try {
            const res = await fetch(`${cloudRunUrl}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error((payload as { detail?: string }).detail ?? 'Submission failed. Please try again.');
            }

            setStatus('success');
        } catch (err: unknown) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-white font-[Inter,sans-serif]">
            {/* ── Animated background ── */}
            <BackgroundCanvas />

            {/* ── Minimal header ── */}
            <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
                <Link to="/" aria-label="Back to home">
                    <img
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="kruit.ai"
                        className="h-7 sm:h-8 w-auto object-contain"
                    />
                </Link>
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to home
                </Link>
            </header>

            {/* ── Main content ── */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-20 pt-6 sm:pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Info panel */}
                    <InfoPanel />

                    {/* Right: Form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Glow behind card */}
                            <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-blue-200/60 via-indigo-100/40 to-purple-200/60 blur-xl" />
                            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-100/50">
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <SuccessState key="success" onBack={() => navigate('/')} />
                                    ) : (
                                        <FormContent
                                            key="form"
                                            form={form}
                                            status={status}
                                            errorMsg={errorMsg}
                                            onChange={handleChange}
                                            onSubmit={handleSubmit}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

/* ─────────────────────── background ─────────────────────── */
function BackgroundCanvas() {
    const orbs = [
        { color: '#93c5fd', size: 560, top: '-10%', left: '-12%', xAnim: [-25, 25, -25], yAnim: [-35, 20, -35], dur: 9 },
        { color: '#a5b4fc', size: 480, top: '40%', right: '-14%', xAnim: [30, -20, 30], yAnim: [20, -30, 20], dur: 11 },
        { color: '#c4b5fd', size: 380, bottom: '5%', left: '25%', xAnim: [-18, 28, -18], yAnim: [26, -18, 26], dur: 13 },
        { color: '#7dd3fc', size: 240, top: '25%', left: '45%', xAnim: [15, -15, 15], yAnim: [-20, 15, -20], dur: 7 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50 to-indigo-50" />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Glowing orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        background: orb.color,
                        top: 'top' in orb ? orb.top : undefined,
                        bottom: 'bottom' in orb ? orb.bottom : undefined,
                        left: 'left' in orb ? orb.left : undefined,
                        right: 'right' in orb ? orb.right : undefined,
                    }}
                    animate={{ x: orb.xAnim, y: orb.yAnim }}
                    transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

/* ─────────────────────── info panel ─────────────────────── */
const features = [
    { icon: Clock, label: 'Response within 24 hours' },
    { icon: Zap, label: 'Personalized product walkthrough' },
    { icon: Shield, label: 'No commitment required' },
];

const stats = [
    { value: '60%', label: 'faster time-to-hire' },
    { value: '50%+', label: 'fewer false positives' },
    { value: '<30', label: 'days to hire' },
];

function InfoPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-900 pt-2"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-6">
                <Zap className="w-3 h-3" />
                Schedule a Demo
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight mb-5">
                See Kruit.ai
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">in&nbsp;action.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 mb-10 leading-relaxed max-w-md">
                Talk to our team and discover how AI-native hiring can cut your time-to-hire by 60% while finding engineers who genuinely excel in agentic workflows.
            </p>

            {/* Feature list */}
            <ul className="space-y-3.5 mb-12">
                {features.map((f, i) => (
                    <motion.li
                        key={f.label}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                            <f.icon className="w-3.5 h-3.5 text-blue-600" />
                        </span>
                        <span className="text-gray-700 text-sm sm:text-base">{f.label}</span>
                    </motion.li>
                ))}
            </ul>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-3 gap-4 border-t border-gray-300 pt-8"
            >
                {stats.map((s) => (
                    <div key={s.value} className="text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-0.5">{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────── form ─────────────────────── */
interface FormContentProps {
    form: FormData;
    status: Status;
    errorMsg: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const inputFields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith', Icon: User, required: true, half: false },
    { name: 'email', label: 'Work Email', type: 'email', placeholder: 'jane@company.com', Icon: Mail, required: true, half: false },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', Icon: Phone, required: false, half: true },
    { name: 'company', label: 'Company', type: 'text', placeholder: 'Acme Corp', Icon: Building2, required: false, half: true },
] as const;

function FormContent({ form, status, errorMsg, onChange, onSubmit }: FormContentProps) {
    return (
        <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-7">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Request a Demo</h2>
                <p className="text-gray-500 text-sm">Fill in the details and we'll be in touch within 24 hours.</p>
            </div>

            <form onSubmit={onSubmit} noValidate>
                {/* Two-column grid for phone + company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {inputFields.map((field, i) => (
                        <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 * i }}
                            className={field.half ? '' : 'sm:col-span-2'}
                        >
                            <FieldLabel label={field.label} required={field.required} />
                            <div className="relative mt-1.5">
                                <field.Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name as keyof FormData]}
                                    onChange={onChange}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    autoComplete={field.name}
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500/30 transition-all"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Message textarea */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.22 }}
                    className="mb-5"
                >
                    <FieldLabel label="How can we help?" required />
                    <div className="relative mt-1.5">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            required
                            rows={4}
                            placeholder="Tell us about your team size, current hiring process, or anything you'd like us to tailor the demo for…"
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                        />
                    </div>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                    {errorMsg && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                        >
                            {errorMsg}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Submit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28 }}
                >
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-200"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending…
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Schedule My Demo
                                <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>
                </motion.div>

                <p className="text-center text-xs text-gray-400 mt-4">
                    By submitting you agree to our privacy policy. No spam, ever.
                </p>
            </form>
        </motion.div>
    );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
    return (
        <label className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
            {label}
            {required && <span className="ml-1 text-blue-600">*</span>}
        </label>
    );
}

/* ─────────────────────── success state ─────────────────────── */
function SuccessState({ onBack }: { onBack: () => void }) {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35 }}
            className="py-10 text-center"
        >
            {/* Animated check ring */}
            <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-6"
            >
                <CheckCircle2 className="w-10 h-10 text-green-400" strokeWidth={1.5} />
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-2xl font-bold text-gray-900 mb-2"
            >
                You're all set!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto"
            >
                We've received your request and sent you a confirmation email. Our team will reach out within&nbsp;24&nbsp;hours.
            </motion.p>

            {/* Progress ring decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-6 mb-8 px-4"
            >
                {['Request received', 'Email sent', 'Team notified'].map((step) => (
                    <div key={step} className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" strokeWidth={2.5} />
                        </span>
                        <span className="text-xs text-gray-500 hidden sm:inline">{step}</span>
                    </div>
                ))}
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46 }}
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
                <ArrowLeft size={14} />
                Back to home
            </motion.button>
        </motion.div>
    );
}
