import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Target, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/ui/tooltip';
import { Card } from '../components/ui/card';

export default function Hero() {
    const navigate = useNavigate();
    return (
        <main className="hero bg-cover bg-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-block mb-4 sm:mb-6"
                >
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-primary text-xs sm:text-sm font-medium">
                        AI-DRIVEN RECRUITMENT PLATFORM
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-[38px] sm:text-4xl md:text-5xl lg:text-[64px] font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2"
                >
                    Hire smarter with <br className="hidden sm:block" />
                    <span className="text-primary">autonomous AI</span><br />
                    at every stage.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
                >
                    kruit.ai combines AI recruiting agents and AI-powered interviews to give you decision-ready candidates before a single human call.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4"
                >
                    <motion.div
                        variants={{ rest: {}, hover: {} }}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto"
                    >
                        <Button size="xxl" className="flex items-center justify-center w-full sm:w-auto" onClick={() => navigate('/?product=recruiter')}>
                            Explore AI Recruiter
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

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="w-full sm:w-auto">
                                        <Button size="xxl" variant="primaryOutline" className="w-full sm:w-auto">
                                            See All Products
                                        </Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={6}>
                                    Feature coming up
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4"
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
                            className={index === 2 ? 'sm:col-span-2 md:col-span-1' : ''}
                        >
                            <Card className="p-4 sm:p-6 text-center border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-primary" />
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
