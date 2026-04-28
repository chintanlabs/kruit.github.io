import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
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
    const [isProductsOpen, setIsProductsOpen] = useState(false);
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

    const handleRecruiterSelect = () => {
        setIsProductsOpen(false);
        setIsOpen(false);
        navigate('/?product=recruiter');
    };

    const handleInterviewerSelect = () => {
        setIsProductsOpen(false);
        setIsOpen(false);
        navigate('/');
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
                <button
                    onClick={() => navigate('/')}
                    className={`text-xl sm:text-2xl font-bold transition-colors duration-500 cursor-pointer ${navBg === 'primary' ? 'text-white' : 'text-primary'
                        }`}
                >
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="kruit.ai logo" className="h-7 sm:h-9 w-auto" />
                </button>

                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {/* Products Dropdown */}
                    <div className="relative group">
                        <button
                            onClick={() => setIsProductsOpen(!isProductsOpen)}
                            className={`text-sm transition-colors duration-500 flex items-center gap-1 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Products
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {/* Dropdown Menu */}
                        <div className={`absolute left-0 mt-3 w-85 rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.22)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 ${isProductsOpen ? 'opacity-100 visible translate-y-0' : ''}`}>
                            <div className="p-2">
                                <button
                                    type="button"
                                    onClick={handleRecruiterSelect}
                                    className="group/item flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-left text-sm text-gray-700 hover:bg-slate-50 hover:shadow-sm transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">AI Recruiter</span>
                                            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-700 border border-cyan-200">
                                                Beta
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                            Automate screening, outreach, and candidate evaluation.
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-primary opacity-0 translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0">
                                        Explore
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleInterviewerSelect}
                                    className="group/item flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-left text-sm text-gray-700 hover:bg-slate-50 hover:shadow-sm transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">AI Interviewer</span>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                                            Run structured interviews with consistent scoring.
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-primary opacity-0 translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0">
                                        Explore
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

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
                        href="/pricing"
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Pricing
                    </a>

                    <a
                        href="/blog"
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Blog
                    </a>

                    <a
                        href="#about"
                        onClick={(e) => handleNavClick(e, 'about')}
                        className={`text-sm transition-colors duration-500 ${navText === 'white' ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        About
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
                        <SheetContent side="right" className="w-75 sm:w-87.5 px-4">
                            <SheetHeader className='p-0 py-4'>
                                <SheetTitle className="text-left text-primary text-xl font-bold">Navigation</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-2">
                                {/* Products Dropdown - Mobile */}
                                <div>
                                    <button
                                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                                        className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100 w-full text-left flex items-center justify-between"
                                    >
                                        Products
                                        <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isProductsOpen && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <button
                                                type="button"
                                                onClick={handleRecruiterSelect}
                                                className="flex w-full items-center justify-between gap-3 py-2 text-left text-gray-600 hover:text-primary transition-colors"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>AI Recruiter</span>
                                                    <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-700 border border-cyan-200">
                                                        Beta
                                                    </span>
                                                </span>
                                                <span className="text-xs font-semibold text-primary">Explore</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleInterviewerSelect}
                                                className="flex w-full items-center justify-between gap-3 py-2 text-left text-gray-600 hover:text-primary transition-colors"
                                            >
                                                <span>AI Interviewer</span>
                                                <span className="text-xs font-semibold text-primary">Explore</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <a
                                    href="#problem"
                                    onClick={(e) => {
                                        handleNavClick(e, 'problem');
                                        setIsOpen(false);
                                    }}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Problem
                                </a>

                                <a
                                    href="#solution"
                                    onClick={(e) => {
                                        handleNavClick(e, 'solution');
                                        setIsOpen(false);
                                    }}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Solution
                                </a>

                                <a
                                    href="/pricing"
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Pricing
                                </a>
                                <a
                                    href="/blog"
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    Blog
                                </a>
                                <a
                                    href="#about"
                                    onClick={(e) => {
                                        handleNavClick(e, 'about');
                                        setIsOpen(false);
                                    }}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
                                >
                                    About
                                </a>

                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full"
                                        onClick={() => {
                                            navigate('/login');
                                            setIsOpen(false);
                                        }}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={() => {
                                            navigate('/signup');
                                            setIsOpen(false);
                                        }}
                                    >
                                        Book a demo
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
                        Book a demo
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
