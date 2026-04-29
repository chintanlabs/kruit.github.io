import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mic, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Footer from './Footer';

const agentCards = [
    {
        icon: Mic,
        title: 'AI Interviewer',
        badge: 'COMING SOON',
        description:
            'Structured AI-led screening interviews with adaptive questioning, real-time scoring, and full transcripts — no human interviewer needed for round one.',
        bullets: [
            'Adaptive question flow based on responses',
            'Real-time communication assessment',
            'Structured scoring rubric per role',
            'Full transcript + AI summary for recruiter',
        ],
    },
    {
        icon: MessageCircle,
        title: 'AI Recruiter',
        badge: 'LIVE NOW',
        description:
            'Coordinated multimodal agents verify candidate claims, collect intent signals, and deliver decision-ready profiles — autonomously.',
        bullets: [
            'Resume intelligence + external enrichment',
            'Email, WhatsApp & voice agents coordinated',
            '0–100 kruit score, JD-relative and explainable',
            'Conflict detection from GitHub, portfolios',
        ],
    },
    {
        icon: FileText,
        title: 'The Full Pipeline',
        badge: 'STAGE 1 / STAGE 2',
        description:
            'Agents handle screening, verification, outreach, and evaluation. By the time a recruiter gets involved, everything knowable has been gathered — so the human conversation is the only one that matters.',
        bullets: [
            'Resume → Enrich → Score → Engage → Decision-ready profile',
            'Structured interview → Adaptive questions → Communication score → Transcript',
            'Human conversation focused on fit, alignment, and final decision',
        ],
    },
];

export default function InterviewerLanding() {
    const navigate = useNavigate();

    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-linear-to-b from-white to-slate-50 text-slate-950">
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-0">
                    <div className="max-w-4xl mx-auto pb-14 sm:pb-16 lg:pb-20 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm"
                        >
                            AI-DRIVEN RECRUITMENT PLATFORM
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-[38px] sm:text-5xl lg:text-6xl xl:text-[72px] font-extrabold leading-[0.95] tracking-tight"
                        >
                            Hire smarter with
                            <span className="block text-primary">autonomous AI</span>
                            at every stage.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600"
                        >
                            kruit.ai combines AI recruiting agents and AI-powered interviews to give you decision-ready candidates before a single human call.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                        >
                            <Button size="xxl" className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 w-full sm:w-auto" onClick={() => navigate('/contact')}>
                                Explore AI Recruiter
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="xxl" variant="primaryOutline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50">
                                See all products
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {agentCards.map((item) => {
                            const Icon = item.icon;
                            const isProductTitle = item.title === 'AI Recruiter' || item.title === 'AI Interviewer' || item.title === 'The Full Pipeline';
                            return (
                                <Card key={item.title} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardContent className="px-6 py-6">
                                        <div className="flex items-start gap-4">
                                            <Icon className="mt-1 h-6 w-6 text-primary" />
                                            <div className="w-full">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className={`text-base sm:text-lg font-bold ${isProductTitle ? 'text-primary' : 'text-slate-950'}`}>{item.title}</h3>
                                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                                        {item.badge}
                                                    </span>
                                                </div>
                                                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{item.description}</p>
                                                {'bullets' in item && (
                                                    <ul className="mt-4 text-sm text-slate-600">
                                                        {item.bullets.map((bullet) => (
                                                            <li key={bullet} className="flex items-start gap-2 border-t border-slate-100 py-2 first:border-t-0 first:pt-0 last:pb-0">
                                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/70" />
                                                                <span>{bullet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 sm:mb-12 text-left"
                    >
                        <p className="text-slate-500 font-bold text-xs sm:text-sm tracking-[0.18em] uppercase">The Full Pipeline</p>
                        <h2 className="mt-3 max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight">
                            The <span className="text-primary">agent</span> does everything it can.
                            <span className="block">The <span className="text-primary">human</span> does everything it should.</span>
                        </h2>
                        <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
                            Agents handle screening, verification, outreach, and evaluation. By the time a recruiter gets involved, everything knowable has been gathered — so the human conversation is the only one that matters.
                        </p>
                    </motion.div>

                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
                                <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
                                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-slate-500">STAGE 1</p>
                                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-primary">AI Recruiter</h3>
                                    <p className="mt-3 text-sm sm:text-base text-slate-600">Resume → Enrich → Score → Engage → Decision-ready profile</p>
                                    <span className="mt-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs sm:text-sm font-bold text-blue-700">Live now</span>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="hidden lg:flex items-center justify-center text-3xl text-slate-300">→</div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.08 }}
                        >
                            <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
                                <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
                                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-slate-500">STAGE 2</p>
                                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-primary">AI Interviewer</h3>
                                    <p className="mt-3 text-sm sm:text-base text-slate-600">Structured interview → Adaptive questions → Communication score → Transcript</p>
                                    <span className="mt-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-bold text-slate-600">Coming soon</span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-14 border-t border-slate-200">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-3xl bg-white px-5 py-6 sm:px-7 sm:py-7 border border-slate-200 shadow-sm text-center lg:text-left">
                        <div>
                            <p className="text-slate-500 font-bold text-xs sm:text-sm tracking-[0.18em] uppercase">Join waitlist</p>
                            <h3 className="mt-2 max-w-3xl text-xl sm:text-2xl lg:text-[1.8rem] font-bold text-primary leading-tight">
                                AI Interviewer
                            </h3>
                            <p className="mt-2 text-sm sm:text-base text-slate-600">
                                Structured AI-led screening interviews with adaptive questioning, real-time scoring, and full transcripts — no human interviewer needed for round one.
                            </p>
                        </div>
                        <Button size="xxl" className="bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 w-full lg:w-auto">
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