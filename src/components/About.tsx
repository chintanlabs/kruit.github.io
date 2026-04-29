import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Code2, Brain } from 'lucide-react';
import { Card } from './ui/card';
import Dipasoke from '@/assets/team/dipasoke.jpg';

const team = [
    {
        name: 'Dipasoke Chattopadhyay',
        role: 'Founder & CEO',
        bio: 'An IIT Kharagpur alumnus and an accomplished Technology leader known for his strategic insight, and commitment to excellence. With extensive experience driving impactful initiatives, he brings a strong blend of innovation, collaboration, and results-oriented thinking to every problem.',
        img: Dipasoke,
        icon: Brain,
        socials: { linkedin: 'https://www.linkedin.com/in/dipasoke/' } as { github?: string; linkedin?: string; twitter?: string },
    },
    {
        name: 'Ai Engineering Team',
        role: 'Software Developers',
        bio: 'A team of experienced ML engineers, full-stack developers, and AI researchers dedicated to building robust, production-ready AI systems. Our team has a proven track record of delivering scalable AI solutions that drive real business impact.',
        icon: Code2,
        socials: {} as { github?: string; linkedin?: string; twitter?: string },
    },
];

export default function About() {
    return (
        <section id="about" className="pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-blue-50/50 via-white to-white min-h-[90vh] flex flex-col items-center">
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-20 sm:mb-28"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                        ABOUT KRUIT.AI
                    </span>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight tracking-tight max-w-4xl mx-auto">
                        We believe hiring should be <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">fair, fast, and verified.</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        kruit.ai is building autonomous AI agents that help recruiters make better decisions with verified signal — not gut feel based on unvalidated resumes.
                    </p>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full flex justify-center"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
                        {team.map((member, index) => {
                            const Icon = member.icon;
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="h-full"
                                >
                                    <Card className="p-8 sm:p-10 border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 text-center bg-white h-full flex flex-col items-center rounded-3xl">
                                        {/* Avatar */}
                                        <div className="flex justify-center mb-6">
                                            {member.img ? (
                                                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-md" />
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-50 shadow-md">
                                                    <Icon className="w-10 h-10 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                                        <p className="text-sm text-primary font-semibold mb-4">{member.role}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{member.bio}</p>

                                        {/* Socials */}
                                        <div className="flex justify-center gap-3 mt-auto">
                                            {member.socials.github && (
                                                <a href={member.socials.github} className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary transition-colors">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socials.linkedin && (
                                                <a href={member.socials.linkedin} target='_blank' className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary transition-colors">
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.socials.twitter && (
                                                <a href={member.socials.twitter} className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary transition-colors">
                                                    <Twitter className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Hiring Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full flex justify-center mt-20 sm:mt-28"
                >
                    <Card className="max-w-4xl w-full p-8 sm:p-10 border-blue-100 bg-blue-50/50 hover:bg-blue-50 hover:shadow-md hover:border-blue-200 transition-all duration-300 rounded-3xl text-left shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    We're building in public — and hiring.
                                </h3>
                                <span className="inline-block w-fit px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-bold tracking-widest uppercase">
                                    BETA • INDIA
                                </span>
                            </div>
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                                We're a small, opinionated team building AI recruiting infrastructure for markets where hiring is genuinely hard. kruit.ai is currently available in beta for recruiting teams in India. If that sounds like your kind of problem, we'd like to hear from you.
                            </p>
                            <a href="mailto:dip@kruit.ai" className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors group">
                                dip@kruit.ai 
                                <span className="ml-1.5 group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </a>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}