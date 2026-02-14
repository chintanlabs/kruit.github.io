import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';

export default function Market() {
    return (
        <section id="market" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-primary font-bold text-sm tracking-wider uppercase">MARKET OPPORTUNITY</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">A massive, underserved market</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Technical hiring is a $100B+ global market moving toward AI-native workflows.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            label: 'TAM',
                            value: '$100B+',
                            title: 'Total Addressable Market',
                            description:
                                'Global talent acquisition technology & services market, including assessments, platforms, and hiring infrastructure',
                            delay: 0
                        },
                        {
                            label: 'SAM',
                            value: '$25–30B',
                            title: 'Serviceable Available Market',
                            description: 'Global technical hiring spend for companies hiring software, data, and AI engineers',
                            delay: 0.2
                        },
                        {
                            label: 'SOM',
                            value: '$1–3B',
                            title: 'Serviceable Obtainable Market',
                            description: 'Mid-market and enterprise companies transitioning to AI-native engineering workflows',
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
                                <div className="mb-4">
                                    <span className="text-primary font-bold text-sm tracking-wider uppercase">{item.label}</span>
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-4">{item.value}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
