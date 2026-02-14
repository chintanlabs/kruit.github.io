import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function CTA() {
    return (
        <section id="cta" className="py-24 px-6 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6)',
                        backgroundSize: '80px 140px',
                        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
                    }}
                ></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your hiring?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join forward-thinking companies building AI-first engineering teams with kruit.ai
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100">
                                Schedule a Demo
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white bg-transparent hover:bg-white/10">
                                Learn More
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
