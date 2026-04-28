import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Code2, Brain, BrainIcon } from 'lucide-react';
import { Card } from './ui/card';
// import Suman from '@/assets/team/suman.jpg';
import Dipasoke from '@/assets/team/dipasoke.jpg';

const team = [
    {
        name: 'Dipasoke Chattopadhyay',
        role: 'Founder & CEO',
        bio: 'An IIT Kharagpur alumnus and an accomplished Technology leader known for his  strategic insight, and commitment to excellence. With extensive experience driving impactful initiatives, he brings a strong blend of innovation, collaboration, and results-oriented thinking to every problem.',
        img: Dipasoke,
        icon: Brain,
        socials: { linkedin: 'https://www.linkedin.com/in/dipasoke/' } as { github?: string; linkedin?: string; twitter?: string},
    },
    {
        name: 'Ai Engineering Team',
        role: 'Software Developers',
        bio: 'A team of experienced ML engineers, full-stack developers, and AI researchers dedicated to building robust, production-ready AI systems. Our team has a proven track record of delivering scalable AI solutions that drive real business impact.',
        icon: Code2,
        socials: { } as { github?: string; linkedin?: string; twitter?: string},
    },
];

export default function About() {
    return (
        <section id="about" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-primary font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-blue-50">
                        About Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                        The team behind the AI
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        A small, focused team on a big mission: building AI products that
                        make businesses measurably better.
                    </p>
                </motion.div>

                {/* Mission statement */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary to-indigo-700 rounded-3xl p-8 sm:p-12 mb-16 text-white text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <BrainIcon className="w-12 h-12 text-white mb-4 mx-auto" />
                        <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-5">
                            "We believe the companies that will define the next decade
                            are the ones<br className="hidden sm:block" /> harnessing AI — not just using it."
                        </blockquote>
                        <p className="text-blue-100 text-base">— ChintanLabs Mission Statement</p>
                    </div>
                </motion.div>

                {/* Team cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-20 max-w-3xl mx-auto">
                    {team.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                            >
                                <Card className="p-7 border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300 text-center h-full">
                                    {/* Avatar */}
                                    <div className="flex justify-center mb-5">
                                        {member.img ? (
                                            <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Icon className="w-10 h-10 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{member.bio}</p>

                                    {/* Socials */}
                                    <div className="flex justify-center gap-3">
                                        {member.socials.github && (
                                            <a href={member.socials.github} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors">
                                                <Github className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        {member.socials.linkedin && (
                                            <a href={member.socials.linkedin} target='_blank' className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors">
                                                <Linkedin className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        {member.socials.twitter && (
                                            <a href={member.socials.twitter} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors">
                                                <Twitter className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}