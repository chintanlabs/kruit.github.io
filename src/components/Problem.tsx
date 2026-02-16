import { motion } from 'framer-motion';
import { Clock, X, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/card';

export default function Problem() {
    return (
        <section id="problem" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <div className="inline-block mb-3 sm:mb-4">
                        <span className="text-primary font-bold text-xs sm:text-sm tracking-wider uppercase">THE PROBLEM</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">AI broke traditional hiring</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Engineering work has fundamentally changed, but hiring processes are still stuck in a pre-AI world.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                            className={index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
                        >
                            <Card className="p-6 sm:p-8 h-full hover:shadow-xl transition-all duration-300 bg-gray-50 border-gray-200">
                                <div
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center ${item.color === 'red' ? 'bg-red-50' : 'bg-orange-50'
                                        }`}
                                >
                                    <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color === 'red' ? 'text-red-500' : 'text-orange-500'}`} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
