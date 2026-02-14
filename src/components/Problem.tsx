import { motion } from 'framer-motion';
import { Clock, X, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/card';

export default function Problem() {
    return (
        <section id="problem" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-primary font-bold text-sm tracking-wider uppercase">THE PROBLEM</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AI broke traditional hiring</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Engineering work has fundamentally changed, but hiring processes are still stuck in a pre-AI world.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Clock,
                            title: '60–90 Day Cycles',
                            description:
                                "Traditional hiring is too slow for modern engineering velocity. Teams can't wait 3 months to fill critical roles.",
                            color: 'red',
                            delay: 0
                        },
                        {
                            icon: X,
                            title: 'Broken Signal',
                            description:
                                'Algorithm tests and coding challenges measure memorization, not the judgment needed to work effectively with AI.',
                            color: 'red',
                            delay: 0.2
                        },
                        {
                            icon: DollarSign,
                            title: 'Expensive Mis-hires',
                            description:
                                'One bad senior hire costs $250K–$500K+ in lost velocity, technical debt, and team disruption.',
                            color: 'orange',
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
                            <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 bg-gray-50 border-gray-200">
                                <div
                                    className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${item.color === 'red' ? 'bg-red-50' : 'bg-orange-50'
                                        }`}
                                >
                                    <item.icon className={`w-7 h-7 ${item.color === 'red' ? 'text-red-500' : 'text-orange-500'}`} />
                                </div>
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
