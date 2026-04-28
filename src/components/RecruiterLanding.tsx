import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, Mic, MessageCircle, Search, Shuffle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Footer from './Footer';

const agentCards = [
    {
        icon: Mail,
        title: 'Email Agent',
        description: 'Outreach, follow-up, and fallback',
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp Agent',
        description: 'Conversational screening at scale',
    },
    {
        icon: Mic,
        title: 'Voice Agent',
        description: 'Scheduled screening calls',
    },
];

const capabilities = [
    {
        icon: Search,
        title: 'Resume Intelligence',
        description: 'Verify, enrich, and score every resume against your JD.',
        accent: 'border-blue-700',
    },
    {
        icon: MessageCircle,
        title: 'Multimodal Agents',
        description: 'Email, WhatsApp, and voice - coordinated, context-aware.',
        accent: 'border-cyan-500',
    },
    {
        icon: CheckCircle2,
        title: 'Decision-Ready Profiles',
        description: 'Scored, flagged, and explained. Ready to act on.',
        accent: 'border-emerald-600',
    },
    {
        icon: Shuffle,
        title: 'Cross-Role Matching',
        description: 'Surface the right fit across all your open roles.',
        accent: 'border-violet-500',
    },
];

export default function RecruiterLanding() {
    const navigate = useNavigate();

    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white text-slate-950">
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-200/70 blur-3xl" />
                <div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-cyan-200/70 blur-3xl" />
                <div className="absolute right-10 -bottom-28 h-96 w-96 rounded-full bg-blue-200/70 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-0">
                    <div className="max-w-4xl mx-auto pb-14 sm:pb-16 lg:pb-20 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            AI Recruiter - Live Now
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-[38px] sm:text-5xl lg:text-6xl xl:text-[72px] font-extrabold leading-[0.95] tracking-tight"
                        >
                            Stop screening resumes.
                            <span className="block text-primary">Start knowing candidates.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600"
                        >
                            AI agents that screen, verify, and engage candidates - so recruiters focus on the conversations that matter.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                        >
                            <Button size="xxl" className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 w-full sm:w-auto" onClick={() => navigate('/contact')}>
                                Book a demo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="xxl" variant="primaryOutline" className="w-full sm:w-auto">
                                See how it works
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"
                    >
                        {agentCards.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className={`flex items-start gap-3 px-5 py-6 sm:px-6 sm:py-5 ${index < 2 ? 'border-b md:border-b-0 md:border-r border-blue-100' : ''}`}
                                >
                                    <Icon className="mt-1 h-5 w-5 text-primary" />
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-slate-950">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-slate-600">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section className="border-y border-blue-100 bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 sm:mb-12 text-center"
                    >
                        <p className="text-primary font-bold text-xs sm:text-sm tracking-[0.18em] uppercase">Core Capabilities</p>
                        <h2 className="mt-3 mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                            Built for the full recruiting workflow.
                        </h2>
                    </motion.div>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        {capabilities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                >
                                    <Card className={`rounded-2xl border border-slate-200 bg-white py-0 shadow-sm ${item.accent} border-l-4`}>
                                        <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 rounded-xl bg-slate-100 p-2.5 text-primary">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-semibold text-slate-950">{item.title}</h3>
                                                    <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-14 border-t border-slate-200">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-3xl bg-blue-50 px-5 py-6 sm:px-7 sm:py-7 border border-blue-100 shadow-sm text-center lg:text-left">
                        <div>
                            <p className="text-primary font-bold text-xs sm:text-sm tracking-[0.18em] uppercase">Coming Next</p>
                            <h3 className="mt-2 max-w-3xl text-xl sm:text-2xl lg:text-[1.8rem] font-bold text-slate-950 leading-tight">
                                AI Interviewer - structured screening interviews, no human needed
                            </h3>
                            <p className="mt-2 text-sm sm:text-base text-slate-600">
                                AI-led technical and behavioural interviews. Coming soon.
                            </p>
                        </div>
                        <Button size="xxl" className="bg-linear-to-r from-violet-600 to-cyan-500 text-white hover:from-violet-500 hover:to-cyan-400 w-full lg:w-auto">
                            Join waitlist
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}