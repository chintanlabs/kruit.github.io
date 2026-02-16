import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';

export default function HowItWorks() {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <div className="inline-block mb-3 sm:mb-4">
                        <span className="text-primary font-bold text-xs sm:text-sm tracking-wider uppercase">HOW IT WORKS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">AI-native evaluation at every stage</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">From screening to final decision, kruit.ai surfaces judgment and systems thinking.</p>
                </motion.div>

                <div className="space-y-4 sm:space-y-6">
                    {[
                        {
                            number: '1',
                            title: 'Agentic Screening',
                            description:
                                'AI agents analyze candidate profiles, work history, and signals to identify high-potential engineers before the first human touchpoint.',
                            delay: 0
                        },
                        {
                            number: '2',
                            title: 'Open-Tool Evaluation',
                            description:
                                'Candidates complete realistic assessments—code review, TDD, system debugging—using AI tools just like in their actual work environment.',
                            delay: 0.2
                        },
                        {
                            number: '3',
                            title: 'Structured Intelligence Reports',
                            description:
                                "Hiring managers receive clear, comparable insights on judgment, decision-making, and technical reasoning—not just pass/fail scores.",
                            delay: 0.4
                        },
                        {
                            number: '4',
                            title: 'Focused Human Interviews',
                            description:
                                'With high-signal data upfront, teams conduct just 1–2 targeted interviews focused on team fit and alignment, not technical vetting.',
                            delay: 0.6
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 sm:p-8 hover:shadow-xl transition-all duration-300 bg-white border-gray-200">
                                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl sm:text-2xl font-bold shrink-0">{item.number}</div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
