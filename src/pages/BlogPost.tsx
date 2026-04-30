import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const XLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// --- Subcomponents ---

const BlogHeader = ({ post }: { post: any }) => (
    <header className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 bg-linear-to-b from-slate-50 to-white">
        <div className="px-4 sm:px-6 max-w-4xl mx-auto w-full relative z-20 mb-8 sm:mb-12 flex justify-start">
            <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-medium text-sm transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to blog
            </Link>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
            >
                <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6">
                    <span className="text-primary bg-white px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
                        {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-slate-500">RECRUITING</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight px-4">
                    {post.title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 px-4">
                    The follow-up problem, the notice period problem, and the salary conversation problem — and how AI agents fix all three.
                </p>
                <p className="text-sm sm:text-base text-slate-500 italic font-medium px-4">
                    Published by kruit.ai · {post.date}
                </p>
            </motion.div>
        </div>
    </header>
);

const AuthorBar = ({ post }: { post: any }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 mb-12 border-t border-b border-slate-100">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 p-2">
                <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="kruit.ai"
                    className="w-full h-auto object-contain"
                />
            </div>
            <div>
                <p className="font-bold text-slate-900 text-sm">kruit.ai</p>
                <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5 font-medium">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <a href="https://x.com/Kruit_ai" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-blue-200 hover:bg-blue-50 transition-all">
                <XLogo className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.linkedin.com/company/kruit-ai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-blue-200 hover:bg-blue-50 transition-all">
                <Linkedin className="w-3.5 h-3.5" />
            </a>
        </div>
    </div>
);

const Paragraph = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-[17px] sm:text-[18px] text-slate-700 leading-relaxed mb-6 ${className}`}>
        {children}
    </p>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-14 mb-6 tracking-tight">
        {children}
    </h2>
);

const List = ({ children, ordered = false, className = "" }: { children: React.ReactNode, ordered?: boolean, className?: string }) => {
    const Tag = ordered ? 'ol' : 'ul';
    const listStyle = ordered ? 'list-decimal' : 'list-disc';
    return (
        <Tag className={`${listStyle} pl-6 mb-8 text-[17px] sm:text-[18px] text-slate-700 leading-relaxed space-y-3 ${className}`}>
            {children}
        </Tag>
    );
};

const SectionBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-12">
        {children}
    </div>
);

const NoteCard = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 sm:px-10 my-12">
        {children}
    </div>
);

export default function BlogPost() {
    const featuredPost = {
        title: 'Why Recruiters Lose Candidates in the First 48 Hours',
        category: 'INSIGHT',
        date: 'May 2026',
        readTime: '4 min read',
    };

    return (
        <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            <Navigation />

            <BlogHeader post={featuredPost} />

            {/* Main Content Area */}
            <main className="px-4 sm:px-6 max-w-3xl mx-auto relative z-20 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <AuthorBar post={featuredPost} />

                    <div className="max-w-none pb-12 font-sans">
                        
                        <SectionBlock>
                            <Paragraph>
                                A strong candidate applies to your role on Monday morning. By Wednesday, they are midway through the discussion somewhere else. You never even called them.
                            </Paragraph>
                            <Paragraph>
                                This is not a rare story. This is the default outcome when recruiting runs on manual processes — and it happens every week, at companies of every size, across every industry.
                            </Paragraph>
                            <Paragraph className="font-medium text-slate-800">
                                The first 48 hours after an application arrives are the most critical window in the entire hiring process. What happens in that window — or more accurately, what doesn't happen — determines whether you get to have a conversation at all.
                            </Paragraph>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionHeading>The 48-hour problem</SectionHeading>
                            <Paragraph>
                                Strong candidates are not waiting for you.
                            </Paragraph>
                            <Paragraph>
                                The same person who applied to your role this morning has likely applied to three others. They are evaluating you as much as you are evaluating them. And the signal they are reading is simple: how fast does this company move?
                            </Paragraph>
                            <Paragraph>
                                <strong className="text-slate-900">Speed communicates respect. Silence communicates indifference.</strong>
                            </Paragraph>
                            <Paragraph>
                                Most recruiting teams are not slow because they are careless. They are slow because the first 48 hours are consumed by work that should never require a human in the first place.
                            </Paragraph>
                            <Paragraph>
                                Here is what typically happens after a strong candidate applies:
                            </Paragraph>
                            <List>
                                <li>Their resume sits in an ATS queue alongside 100+ others, unranked and unread.</li>
                                <li>A recruiter eventually opens the queue — usually the next morning, sometimes two days later — and begins reading manually.</li>
                                <li>If the candidate looks promising, the recruiter tries to find contact details, drafts a message, and sends an outreach email.</li>
                                <li>The candidate, who applied in a moment of active job-seeking energy, has already moved on mentally — or worse, received a faster response from a competitor.</li>
                            </List>
                            <Paragraph>
                                By the time your recruiter is ready to talk, the window has closed.
                            </Paragraph>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionHeading>What candidates actually need in 48 hours</SectionHeading>
                            <Paragraph>
                                They do not need a final decision. They do not need a hiring manager's time.
                            </Paragraph>
                            <Paragraph>
                                They need three things:
                            </Paragraph>
                            <ul className="list-none mb-8 text-[17px] sm:text-[18px] text-slate-700 leading-relaxed space-y-6">
                                <li className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">1. Acknowledgement</h3>
                                    Confirmation that their application was received and is being reviewed by a real process, not a black hole.
                                </li>
                                <li className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">2. Basic intent collection</h3>
                                    A quick, conversational check on salary expectations, notice period, and location preference. This takes 5 minutes if handled well.
                                </li>
                                <li className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">3. A clear next step</h3>
                                    What happens next, and when. Ambiguity kills momentum.
                                </li>
                            </ul>
                            <Paragraph>
                                None of these require a recruiter's time. All of them require a fast, intelligent, well-designed process.
                            </Paragraph>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionHeading>The cost of getting this wrong</SectionHeading>
                            <Paragraph>
                                The obvious cost is the candidate you lost. But that is only the beginning.
                            </Paragraph>
                            <Paragraph>
                                The recruiter now spends another two weeks reviewing the remaining pipeline, only to find that the next best candidate has also moved on. The role stays open longer. The hiring manager grows frustrated. The team carries the gap.
                            </Paragraph>
                            <Paragraph>
                                A single mis-timed 48-hour window can add four to six weeks to your time-to-hire. At a conservative cost of ₹20–40 lakh per mis-hire or extended vacancy, <strong className="text-slate-900">this is not a process inefficiency. It is a business problem.</strong>
                            </Paragraph>
                        </SectionBlock>

                        <SectionBlock>
                            <SectionHeading>What the first 48 hours should look like</SectionHeading>
                            <Paragraph>
                                The moment a candidate applies, an intelligent agent should:
                            </Paragraph>
                            <List>
                                <li>Pull the JD and score the candidate against it — skills, experience, seniority — with a plain-language explanation of the reasoning.</li>
                                <li>Verify resume claims against external evidence before investing recruiter time.</li>
                                <li>Reach out via the candidate's preferred channel — email, WhatsApp, or a scheduled call — to collect intent signals: salary, notice period, relocation, competing offers.</li>
                                <li>Drop a decision-ready profile into a ranked queue so that when a recruiter opens their morning, the work is already done.</li>
                            </List>
                            <Paragraph className="mb-10">
                                The recruiter's first touchpoint with a candidate should be a meaningful conversation — not a triage task.
                            </Paragraph>
                            
                            <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug py-8 border-y border-slate-100 text-center tracking-tight">
                                The <span className="text-primary">agent</span> does everything it can.<br className="hidden sm:block" />
                                The <span className="text-primary">human</span> does everything it should.
                            </div>
                        </SectionBlock>

                        <NoteCard>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">A note from kruit.ai</h2>
                            <Paragraph>
                                This is exactly the problem we built kruit.ai to solve.
                            </Paragraph>
                            <Paragraph>
                                Our AI recruiting agents engage candidates within minutes of application — across email, WhatsApp, and voice — collecting the signals that matter before a recruiter needs to get involved. Every candidate is scored, verified, and ranked. The ones worth calling are flagged green. The ones with mismatches are flagged early, before anyone wastes time.
                            </Paragraph>
                            <Paragraph className="text-slate-900 font-bold mb-4">
                                We are coming in beta in end of May 2026, available for recruiting teams in India.
                            </Paragraph>
                            <Paragraph>
                                If your recruiters are losing candidates in the first 48 hours, we'd like to show you what the alternative looks like.
                            </Paragraph>

                            <div className="mt-8 flex items-center gap-3 text-slate-700 font-medium text-[16px]">
                                <span className="text-primary text-xl font-bold">→</span>
                                <a href="mailto:hello@kruit.ai" className="hover:underline text-primary">
                                    hello@kruit.ai
                                </a>
                                <span>·</span>
                                <span>kruit.ai</span>
                            </div>
                        </NoteCard>

                        <p className="text-[14px] sm:text-[15px] text-slate-500 italic pt-8 border-t border-slate-100 text-center">
                            kruit.ai is an AI-native recruiting platform built for India's hiring teams.<br className="hidden sm:block" /> 
                            AI Recruiter is going to be live in beta in end of May 2026. AI Interviewer is coming soon.
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
