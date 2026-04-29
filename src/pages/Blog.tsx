import { motion } from 'framer-motion';
import { ArrowRight, Search, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Blog() {
    const featuredPost = {
        id: 1,
        title: 'We built an AI recruiter that talks to candidates so yours doesn\'t have to',
        category: 'PRODUCT LAUNCH',
        date: 'April 2026',
        readTime: '6 min read',
        excerpt: 'Introducing Candidate Intelligence — kruit.ai\'s coordinated multimodal agent system. Three channels, one context, zero duplicate questions. Here\'s what we built and why.',
    };

    const blogPosts = [
        {
            id: 1,
            title: 'Resume Intelligence: how we verify candidates, not just parse them',
            category: 'PRODUCT',
            date: 'April 2026',
            readTime: '5 min read',
            excerpt: 'GitHub enrichment, conflict detection, and why we never let a claim go unvalidated.',
            icon: Search,
            bgColor: 'bg-blue-100',
        },
        {
            id: 2,
            title: 'Why recruiters in India lose candidates in the first 48 hours',
            category: 'INSIGHT',
            date: 'March 2026',
            readTime: '4 min read',
            excerpt: 'The follow-up problem, the notice period problem, and the salary conversation problem — and how AI agents fix all three.',
            icon: Lightbulb,
            bgColor: 'bg-amber-100',
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

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16 sm:mb-20"
                >
                    <div className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-blue-100/70">
                        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="bg-primary p-6 sm:p-8 lg:p-10 text-white">
                                <p className="text-blue-200 font-bold text-[11px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4">
                                    {featuredPost.category}
                                </p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 leading-tight text-white">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-blue-100 text-xs sm:text-sm font-medium">
                                    {featuredPost.date} · {featuredPost.readTime}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                                    {featuredPost.excerpt}
                                </p>
                                <Button
                                    className="w-fit bg-primary text-white hover:bg-primary/90 rounded-full font-semibold shadow-sm shadow-blue-600/20"
                                >
                                    Read post <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Blog Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    {blogPosts.map((post, index) => {
                        const IconComponent = post.icon;
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-300"
                            >
                                <div className={`${post.bgColor} h-40 sm:h-48 flex items-center justify-center`}>
                                    <IconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-primary opacity-70" />
                                </div>
                                <div className="p-6 sm:p-8">
                                    <p className="text-primary font-bold text-[11px] sm:text-xs tracking-widest uppercase mb-2 sm:mb-3">
                                        {post.category}
                                    </p>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4 sm:mb-6 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100">
                                        <p className="text-slate-500 text-[11px] sm:text-xs">
                                            {post.date} · {post.readTime}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            className="text-primary hover:text-primary hover:bg-blue-50 p-0 font-semibold"
                                        >
                                            Read <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
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
