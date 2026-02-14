import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';

export default function Navigation() {
    const [navBg, setNavBg] = useState('white');
    const [navText, setNavText] = useState('gray-600');

    useEffect(() => {
        const handleScroll = () => {
            const ctaSection = document.getElementById('cta');
            if (ctaSection) {
                const rect = ctaSection.getBoundingClientRect();
                if (rect.top <= 80 && rect.bottom >= 80) {
                    setNavBg('primary');
                    setNavText('white');
                } else {
                    setNavBg('white');
                    setNavText('gray-600');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 transition-all duration-500 ${navBg === 'primary' ? 'bg-primary/95 border-blue-500' : 'bg-white/80 border-gray-200'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div
                    className={`text-2xl font-bold transition-colors duration-500 ${navBg === 'primary' ? 'text-white' : 'text-primary'
                        }`}
                >
                    <img src="/logo.png" alt="kruit.ai logo" className="h-9 w-auto" />
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#problem"
                        className={`transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Problem
                    </a>
                    <a
                        href="#solution"
                        className={`transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Solution
                    </a>
                    <a
                        href="#roi"
                        className={`transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        ROI
                    </a>
                    <a
                        href="#market"
                        className={`transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Market
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant={'outline'}
                        size={'xl'}
                        className={`hidden sm:inline-flex transition-colors duration-500 ${navBg === 'primary' ? 'border-white text-white bg-transparent hover:text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Book Demo
                    </Button>
                    <Button
                        className={navBg === 'primary' ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary text-white hover:bg-blue-700'}
                        size={'xl'}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
