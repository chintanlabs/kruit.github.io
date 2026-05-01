import { motion } from 'framer-motion';
import { Bot, Mic, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';

export default function ProductsOverview() {
    const navigate = useNavigate();

    return (
        <section className="py-16 sm:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                {/* Two Main Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-24 sm:mb-32">
                    {/* AI Recruiter Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="h-full p-8 sm:p-10 border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden bg-white/80 backdrop-blur-xl group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                            
                            {/* Top Right Badge */}
                            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                                <span className="px-2.5 py-1 rounded bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-widest border border-blue-100">Live Now</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-5">
                                <div className="p-2.5 bg-blue-50 text-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">AI Recruiter</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                                Coordinated multimodal agents verify candidate claims, collect intent signals, and deliver decision-ready profiles — autonomously.
                            </p>
                            
                            <ul className="space-y-3 mb-8 grow">
                                {[
                                    "Resume intelligence + external enrichment",
                                    "Email, WhatsApp & voice agents coordinated",
                                    "0–100 kruit score, JD-relative and explainable",
                                    "Conflict detection from GitHub, portfolios"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => navigate('/?product=recruiter')}
                                className="text-primary font-semibold text-sm flex items-center gap-2 hover:text-blue-700 transition-colors mt-auto"
                            >
                                Learn more <ArrowRight className="w-4 h-4" />
                            </button>
                        </Card>
                    </motion.div>

                    {/* AI Interviewer Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="h-full p-8 sm:p-10 border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden bg-white/80 backdrop-blur-xl group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-600"></div>
                            
                            {/* Top Right Badge */}
                            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-200">Coming Soon</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-5">
                                <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <Mic className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">AI Interviewer</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                                Structured AI-led screening interviews with adaptive questioning, real-time scoring, and full transcripts — no human interviewer needed for round one.
                            </p>
                            
                            <ul className="space-y-3 mb-8 grow">
                                {[
                                    "Adaptive question flow based on responses",
                                    "Real-time communication assessment",
                                    "Structured scoring rubric per role",
                                    "Full transcript + AI summary for recruiter"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => navigate('/?product=interviewer')}
                                className="text-slate-600 font-semibold text-sm flex items-center gap-2 hover:text-slate-800 transition-colors mt-auto"
                            >
                                Join waitlist <ArrowRight className="w-4 h-4" />
                            </button>
                        </Card>
                    </motion.div>
                </div>

                {/* The Full Pipeline Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <p className="text-primary font-bold text-[11px] sm:text-xs tracking-widest uppercase mb-4">THE FULL PIPELINE</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                        The <span className="text-primary">agent</span> does everything it can.<br />
                        The <span className="text-primary">human</span> does everything it should.
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-12 sm:mb-16 max-w-3xl">
                        Agents handle screening, verification, outreach, and evaluation. By the time a recruiter gets involved, everything knowable has been gathered — so the human conversation is the only one that matters.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 relative">
                    {/* Stage 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1"
                    >
                        <Card className="h-full p-6 sm:p-8 bg-blue-50/40 backdrop-blur-md border border-blue-100 shadow-sm relative hover:shadow-md transition-shadow">
                            {/* Top Right Badge */}
                            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                                <span className="px-2.5 py-1 rounded bg-blue-100 text-primary text-[10px] font-bold uppercase tracking-widest border border-blue-200">Live now</span>
                            </div>

                            <p className="text-primary font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-4">STAGE 1</p>
                            <div className="flex items-center gap-3 mb-4">
                                <Bot className="w-5 h-5 text-primary" />
                                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">AI Recruiter</h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                {["Resume", "Enrich", "Score", "Engage", "Decision-ready profile"].map((step, idx, arr) => (
                                    <div key={idx} className="flex items-center gap-2 group/capsule">
                                        <span className="px-3 py-1.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-semibold border border-blue-100 shadow-sm group-hover/capsule:-translate-y-0.5 group-hover/capsule:shadow-md group-hover/capsule:border-blue-300 group-hover/capsule:bg-blue-50/50 transition-all duration-300 cursor-default">
                                            {step}
                                        </span>
                                        {idx < arr.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-blue-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Arrow Connector (Desktop) */}
                    <div className="hidden md:flex items-center justify-center shrink-0 w-8 z-0">
                        <ArrowRight className="w-6 h-6 text-slate-300" />
                    </div>

                    {/* Arrow Connector (Mobile) */}
                    <div className="md:hidden flex items-center justify-center py-2 shrink-0 z-0">
                        <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
                    </div>

                    {/* Stage 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex-1"
                    >
                        <Card className="h-full p-6 sm:p-8 bg-slate-50/40 backdrop-blur-md border border-slate-200 shadow-sm relative hover:shadow-md transition-shadow">
                            {/* Top Right Badge */}
                            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-200">Coming soon</span>
                            </div>

                            <p className="text-slate-500 font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-4">STAGE 2</p>
                            <div className="flex items-center gap-3 mb-4">
                                <Mic className="w-5 h-5 text-slate-600" />
                                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">AI Interviewer</h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                {["Structured interview", "Adaptive questions", "Communication score", "Transcript"].map((step, idx, arr) => (
                                    <div key={idx} className="flex items-center gap-2 group/capsule">
                                        <span className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200 shadow-sm group-hover/capsule:-translate-y-0.5 group-hover/capsule:shadow-md group-hover/capsule:border-slate-400 group-hover/capsule:bg-slate-50 transition-all duration-300 cursor-default">
                                            {step}
                                        </span>
                                        {idx < arr.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-slate-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
