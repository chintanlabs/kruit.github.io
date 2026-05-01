import { motion } from 'framer-motion';
import Footer from './Footer';

export default function InterviewerLanding() {
    return (
        <main className="flex flex-col bg-white">
            {/* Hero — fills full viewport so footer is below the fold */}
            <section
                className="hero bg-linear-to-b from-gray-50 to-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-3xl w-full mx-auto flex flex-col items-center text-center py-24 sm:py-28">

                    {/* "Coming Soon" badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 sm:mb-8"
                    >
                        <span className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-blue-50 text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                            Coming Soon
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[36px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight tracking-tight mb-5 sm:mb-7 px-2"
                    >
                        AI Interviewer
                    </motion.h1>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="w-10 h-px bg-blue-200 origin-center mb-6 sm:mb-8"
                    />

                    {/* Descriptor */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.32 }}
                        className="px-2"
                    >
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary mb-2">
                            Coming Next
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5 leading-snug">
                            AI Interviewer — structured screening interviews, no human needed
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            AI-led technical and behavioural interviews. Coming soon.
                        </p>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main>
    );
}