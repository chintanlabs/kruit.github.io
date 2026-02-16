import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';

export default function Solution() {
    return (
        <section id="solution" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <div className="inline-block mb-3 sm:mb-4">
                        <span className="text-primary font-bold text-xs sm:text-sm tracking-wider uppercase">THE SOLUTION</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">From volume to velocity</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Replace high-volume, low-signal hiring with AI-native evaluations that measure what actually matters.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <Card className="p-6 sm:p-8 h-full border-2 border-gray-200 bg-white">
                            <div className="mb-4 sm:mb-6">
                                <span className="text-red-600 font-bold text-xs tracking-wider uppercase">BEFORE</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">Legacy Hiring Process</h3>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">High-Volume Applicants</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Resume-driven, low-signal filtering</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Algorithm-Based Screens</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Measures recall, not real-world capability</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Interview-Heavy Funnel</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">4–6 rounds, significant engineering time cost</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Inconclusive Signal</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Limited insight into judgment, collaboration, or delivery</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Extended Hiring Cycles</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Limited insight into judgment, collaboration, or delivery</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                        <Card className="p-6 sm:p-8 h-full border-2 border-blue-400 bg-white shadow-lg">
                            <div className="mb-4 sm:mb-6">
                                <span className="text-primary font-bold text-xs tracking-wider uppercase">AFTER</span>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">kruit.ai</h3>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">AI-Powered Candidate Qualification</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Agentic screening identifies high-signal talent early</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">AI-Native Skill Evaluation</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Open-tool assessments for TDD, code review, and real-time system debug</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Structured Candidate Intelligence</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">Clear, comparable reports for confident decision-making</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Reduced Interview Load</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">1–2 focused human interviews per candidate</p>
                                </div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">Accelerated, Lower-Risk Hiring</h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">&lt;30 day time-to-hire with improved quality and retention</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
