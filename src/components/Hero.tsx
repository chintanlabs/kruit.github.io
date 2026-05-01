import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/ui/tooltip';


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
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-blue-50/80 text-primary text-xs sm:text-sm font-semibold border border-blue-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-blue-300 hover:bg-white transition-all duration-300 cursor-default tracking-wide">
                        AI-Driven Recruitment Platform
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


            </div>
        </main>
    );
}
