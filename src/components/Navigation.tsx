import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../components/ui/sheet';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const [navBg, setNavBg] = useState('white');
    const [navText, setNavText] = useState('gray-600');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        setIsOpen(false);

        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed nav height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div
                    className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${navBg === 'primary' ? 'text-white' : 'text-primary'
                        }`}
                >
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="kruit.ai logo" className="h-7 sm:h-9 w-auto" />
                </div>

                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    <a
                        href="#problem"
                        onClick={(e) => handleNavClick(e, 'problem')}
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Problem
                    </a>
                    <a
                        href="#solution"
                        onClick={(e) => handleNavClick(e, 'solution')}
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Solution
                    </a>
                    <a
                        href="#roi"
                        onClick={(e) => handleNavClick(e, 'roi')}
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        ROI
                    </a>

                </div>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`lg:hidden ${navBg === 'primary' ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] px-4">
                            <SheetHeader className='p-0 py-4'>
                                <SheetTitle className="text-left text-primary text-xl font-bold">Navigation</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-2">
                                <a
                                    href="#problem"
                                    onClick={(e) => handleNavClick(e, 'problem')}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Problem
                                </a>
                                <a
                                    href="#solution"
                                    onClick={(e) => handleNavClick(e, 'solution')}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Solution
                                </a>
                                <a
                                    href="#roi"
                                    onClick={(e) => handleNavClick(e, 'roi')}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    ROI
                                </a>

                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                                    <Button variant="outline" size="lg" className="w-full">
                                        Book Demo
                                    </Button>
                                    <Button size="lg" className="w-full">
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Button
                        variant={'outline'}
                        size={'xl'}
                        className={`hidden md:inline-flex transition-colors duration-500 ${navBg === 'primary' ? 'border-white text-white bg-transparent hover:text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </Button>
                    <Button
                        className={`text-sm sm:text-base ${navBg === 'primary' ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary text-white hover:bg-blue-700'}`}
                        size={'xl'}
                        onClick={() => navigate('/signup')}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
