import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Blog() {
    const navigate = useNavigate();

    const blogPosts = [
        {
            id: 1,
            slug: 'why-recruiters-lose-candidates-in-the-first-48-hours',
            title: 'Why Recruiters Lose Candidates in the First 48 Hours',
            category: 'INSIGHT',
            date: 'May 2026',
            readTime: '4 min read',
            excerpt: 'The follow-up problem, the notice period problem, and the salary conversation problem — and how AI agents fix all three.',
            icon: Lightbulb,
            bgColor: 'bg-[#fff8da]', // light yellow
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50">
            <Navigation />
            <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-primary font-bold text-[11px] sm:text-xs tracking-widest uppercase mb-2 sm:mb-3">BLOG</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 mb-4 sm:mb-6 leading-tight">
                        From the <span className="text-primary">kruit.ai</span> team.
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                        Product announcements, recruiting insights, and thinking from the people building kruit.ai.
                    </p>
                </motion.div>

                {/* Blog Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {blogPosts.map((post, index) => {
                        const IconComponent = post.icon;
                        return (
                            <motion.div
                                key={post.id}
                                onClick={() => navigate(`/blog/${post.slug}`)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                className="group cursor-pointer aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
                            >
                                <div className={`${post.bgColor} h-[24%] flex items-center justify-center shrink-0 border-b border-slate-100/50`}>
                                    <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-primary" strokeWidth={2.5} />
                                </div>
                                <div className="p-4 sm:p-5 flex flex-col flex-1">
                                    <p className="text-primary font-bold text-[10px] sm:text-[11px] tracking-widest uppercase mb-2">
                                        {post.category}
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-[13px] sm:text-[14px] mb-3 leading-relaxed flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                                        <p className="text-slate-500 text-[13px]">
                                            {post.date} · {post.readTime}
                                        </p>
                                        <div className="text-primary font-semibold text-[13px] flex items-center group-hover:underline decoration-2 underline-offset-4">
                                            Read <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}
