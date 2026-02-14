import { motion } from 'framer-motion';
import { Zap, Target, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function Hero() {
    return (
        <main className="hero bg-cover md:bg-contain pt-32 pb-20 px-6 bg-linear-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-medium">
                        <Zap className="w-4 h-4" />
                        AI-Native Hiring Infrastructure
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-5xl md:text-[64px] font-extrabold text-gray-900 mb-6 leading-tight"
                >
                    Hire engineers for <br />
                    <span className="text-gray-900">judgment, not memorization</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                >
                    The first recruiting platform built for AI-first engineering teams. Evaluate real-world reasoning, reduce time-to-hire by 60%, and eliminate false positives.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-15"
                >
                    <motion.div
                        variants={{ rest: {}, hover: {} }}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button size="xxl" className="flex items-center">
                            Schedule a Demo
                            <motion.span
                                className="ml-2 inline-flex"
                                variants={{
                                    rest: { x: 0, opacity: 1 },
                                    hover: {
                                        x: [0, 20, -20, 0],
                                        opacity: [1, 0, 0, 1],
                                        transition: { duration: 0.8, times: [0, 0.25, 0.6, 1], ease: 'easeInOut' }
                                    }
                                }}
                            >
                                <ArrowRight size={16} />
                            </motion.span>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="xxl" variant="primaryOutline">
                            See How It Works
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { icon: Zap, value: '60%', label: 'Faster hiring', delay: 0 },
                        { icon: Target, value: '50%+', label: 'Fewer false positives', delay: 0.1 },
                        { icon: Calendar, value: '<30', label: 'Days to hire', delay: 0.2 }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 + stat.delay }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="p-6 text-center border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                                <div className="text-5xl font-bold text-primary">{stat.value}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
