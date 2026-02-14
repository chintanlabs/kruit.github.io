import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';

export default function ROI() {
    return (
        <section id="roi" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-primary font-bold text-sm tracking-wider uppercase">RETURN ON INVESTMENT</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Measurable impact from day one</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">kruit.ai delivers faster hiring, better signal, and stronger long-term retention.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            value: '40–60%',
                            title: 'Faster Time-to-Hire',
                            description: 'Agentic screening and high-signal evaluations eliminate low-quality interview rounds',
                            delay: 0
                        },
                        {
                            value: '50%+',
                            title: 'Reduction in False Positives',
                            description: 'We evaluate real-world reasoning, not memorization or AI-assisted trivia',
                            delay: 0.2
                        },
                        {
                            value: '↓ Cost',
                            title: 'Lower Cost, Higher Retention',
                            description: 'Better signal upfront leads to fewer mis-hires and stronger long-term fits',
                            delay: 0.4
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-gray-200">
                                <div className="text-5xl font-bold text-primary mb-4">{item.value}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
