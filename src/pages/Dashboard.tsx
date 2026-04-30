import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '../components/ui/sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Zap,
    Brain,
    Search,
    MessageSquare,
    FileText,
    ChevronRight,
    Bell,
    TrendingUp,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser } from '../features/auth/authSlice';
import { tokenStorage } from '../services/auth.service';
import { config } from '../config';

const navMain = [
    { title: 'Overview', icon: LayoutDashboard, id: 'overview', badge: null },
    { title: 'Candidates', icon: Users, id: 'candidates', badge: '12' },
    { title: 'Assessments', icon: ClipboardList, id: 'assessments', badge: '3' },
    { title: 'Analytics', icon: BarChart3, id: 'analytics', badge: null },
    { title: 'Reports', icon: FileText, id: 'reports', badge: null },
];

const products = [
    {
        id: 'resume-intelligence',
        title: 'Resume Intelligence',
        description: 'AI-powered resume parsing and candidate scoring — surface the best talent from every application.',
        icon: Search,
        color: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        badge: 'Most Used',
        stats: '2.4× faster',
        external: true,
    },
    {
        id: 'ai-evaluation',
        title: 'AI Skill Evaluation',
        description: 'Open-tool assessments for TDD, code review, system debug and real-world reasoning.',
        icon: Brain,
        color: 'from-violet-500 to-purple-600',
        bg: 'bg-violet-50',
        iconColor: 'text-violet-600',
        badge: 'New',
        stats: '50%+ precision',
        external: false,
    },
    {
        id: 'structured-interviews',
        title: 'Structured Interviews',
        description: 'AI-generated, role-specific interview guides with calibrated scorecards.',
        icon: MessageSquare,
        color: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        badge: null,
        stats: '1–2 rounds only',
        external: false,
    },
    {
        id: 'candidate-intelligence',
        title: 'Candidate Intelligence',
        description: 'Clear, comparable reports for every candidate — confident decisions at scale.',
        icon: Zap,
        color: 'from-amber-500 to-orange-500',
        bg: 'bg-amber-50',
        iconColor: 'text-amber-600',
        badge: null,
        stats: 'Full signal',
        external: false,
    },
];

const metrics = [
    { label: 'Active Pipelines', value: '8', icon: TrendingUp, change: '+2 this week', positive: true },
    { label: 'Time to Hire', value: '18d', icon: Clock, change: '↓ 42% vs avg', positive: true },
    { label: 'Candidates Screened', value: '143', icon: Users, change: '+24 this month', positive: true },
    { label: 'Assessments Done', value: '37', icon: CheckCircle2, change: '92% pass rate', positive: true },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
    }),
};

export default function Dashboard() {
    const [activeNav, setActiveNav] = useState('overview');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const userInitials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : (user?.email?.[0]?.toUpperCase() ?? '?');

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login', { replace: true });
    };

    const handleProductLaunch = (productId: string, external: boolean) => {
        if (!external) return; // Coming soon — not yet wired up
        if (productId === 'resume-intelligence') {
            const at = tokenStorage.getAccessToken();
            const rt = tokenStorage.getRefreshToken();
            if (at && rt) {
                // Strip any trailing slash before appending the hash
                const base = config.resumeVettingUrl.replace(/\/$/, '');
                const url = `${base}/login#at=${encodeURIComponent(at)}&rt=${encodeURIComponent(rt)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        }
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50">
                {/* ── Sidebar ── */}
                <Sidebar
                    className="border-r border-gray-200 bg-white"
                    collapsible="icon"
                >
                    {/* Logo */}
                    <SidebarHeader className="px-4 py-4 border-b border-gray-100">
                        <a href="/" className="inline-block">
                            <img
                                src={`${import.meta.env.BASE_URL}logo.png`}
                                alt="kruit.ai"
                                className="h-7 w-auto"
                            />
                        </a>
                    </SidebarHeader>

                    <SidebarContent>
                        {/* Main nav */}
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navMain.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                isActive={activeNav === item.id}
                                                onClick={() => setActiveNav(item.id)}
                                                tooltip={item.title}
                                                className={`gap-3 rounded-lg transition-all ${activeNav === item.id
                                                    ? 'bg-primary/10 text-primary font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <item.icon className="w-4 h-4 shrink-0" />
                                                <span>{item.title}</span>
                                                {item.badge && (
                                                    <span className="ml-auto text-xs bg-primary text-white rounded-full px-1.5 py-0.5 leading-none">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* Products */}
                        <SidebarGroup className="mt-2">
                            <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                                Products
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {products.map((p) => (
                                        <SidebarMenuItem key={p.id}>
                                            <SidebarMenuButton
                                                tooltip={p.title}
                                                className="gap-3 rounded-lg text-gray-600 hover:bg-gray-100"
                                            >
                                                <p.icon className={`w-4 h-4 shrink-0 ${p.iconColor}`} />
                                                <span className="truncate">{p.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    {/* Footer */}
                    <SidebarFooter className="border-t border-gray-100 px-2 py-3">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Settings" className="gap-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip="Log out"
                                    onClick={handleLogout}
                                    className="gap-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* ── Main Content ── */}
                <SidebarInset className="flex-1 flex flex-col overflow-hidden">
                    {/* Top bar */}
                    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 py-3.5">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="text-gray-500 hover:text-gray-800" />
                            <div className="hidden sm:block">
                                <h1 className="text-base font-semibold text-gray-900">Dashboard</h1>
                                <p className="text-xs text-gray-400">Welcome back{user?.name ? `, ${user.name}` : ''} — here's what's happening</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative text-gray-500">
                                <Bell className="w-4.5 h-4.5" />
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                            </Button>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                {userInitials}
                            </div>
                        </div>
                    </header>

                    {/* Scrollable body */}
                    <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        {/* Metrics row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {metrics.map((m, i) => (
                                <motion.div
                                    key={m.label}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Card className="p-4 sm:p-5 border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-xs font-medium text-gray-500">{m.label}</span>
                                            <m.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{m.value}</p>
                                        <p className={`text-xs font-medium ${m.positive ? 'text-emerald-600' : 'text-red-500'
                                            }`}>{m.change}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Products heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="mb-5"
                        >
                            <h2 className="text-lg font-bold text-gray-900">Products &amp; Solutions</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Select a product to get started or continue where you left off.</p>
                        </motion.div>

                        {/* Product cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-10">
                            {products.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    custom={i + 4}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className={product.external ? 'cursor-pointer' : 'cursor-default opacity-70'}
                                    onClick={() => handleProductLaunch(product.id, product.external)}
                                >
                                    <Card className="group relative h-full p-5 sm:p-6 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        {/* Gradient top bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${product.color}`} />

                                        {/* Badge */}
                                        {product.badge && (
                                            <span className="absolute top-4 right-4 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                {product.badge}
                                            </span>
                                        )}

                                        {/* Icon */}
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${product.bg} mb-4`}>
                                            <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                                        </div>

                                        <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-xs font-semibold text-primary bg-primary/8 px-2 py-1 rounded-md">
                                                {product.stats}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.65 }}
                        >
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                            <Card className="border-gray-200 divide-y divide-gray-100">
                                {[
                                    { action: 'AI Screening completed', candidate: 'Alex Morgan', role: 'Senior Backend Engineer', time: '2h ago', status: 'passed' },
                                    { action: 'Assessment sent', candidate: 'Sam Rivera', role: 'Staff ML Engineer', time: '5h ago', status: 'pending' },
                                    { action: 'Candidate report ready', candidate: 'Jordan Lee', role: 'Frontend Lead', time: '1d ago', status: 'ready' },
                                    { action: 'Interview scheduled', candidate: 'Taylor Kim', role: 'Platform Engineer', time: '1d ago', status: 'scheduled' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35, delay: 0.7 + i * 0.07 }}
                                        className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                                                {item.candidate.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.candidate}</p>
                                                <p className="text-xs text-gray-400">{item.action} · {item.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${item.status === 'passed' ? 'bg-emerald-100 text-emerald-700'
                                                : item.status === 'pending' ? 'bg-amber-100 text-amber-700'
                                                    : item.status === 'ready' ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                            <span className="text-xs text-gray-400">{item.time}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </Card>
                        </motion.div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}