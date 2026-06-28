import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Database,
    FileText,
    Fingerprint,
    Globe2,
    LockKeyhole,
    Mail,
    MessageCircle,
    Scale,
    ShieldCheck,
    Sparkles,
    Trash2,
    UserCheck,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

type LegalPageKey = 'privacy' | 'dataDeletion' | 'gdpr' | 'terms';

type LegalSection = {
    title: string;
    icon: LucideIcon;
    body: string[];
};

type LegalPageContent = {
    eyebrow: string;
    title: string;
    subtitle: string;
    effectiveDate: string;
    primaryAction: string;
    primaryHref: string;
    heroIcon: LucideIcon;
    highlights: string[];
    sections: LegalSection[];
};

const contactEmail = 'ops@kruit.ai';

const legalPages: Record<LegalPageKey, LegalPageContent> = {
    privacy: {
        eyebrow: 'Privacy Policy',
        title: 'Privacy Policy',
        subtitle:
            'How kruit.ai collects, uses, protects, and manages personal data across our recruiting platform, WhatsApp interactions, and customer workflows.',
        effectiveDate: 'Effective May 25, 2026',
        primaryAction: 'Request privacy support',
        primaryHref: `mailto:${contactEmail}`,
        heroIcon: ShieldCheck,
        highlights: [
            'We use data to provide recruiting automation, candidate engagement, support, and security.',
            'We do not sell personal data.',
            'Deletion and privacy requests can be sent to ops@kruit.ai.',
        ],
        sections: [
            {
                title: 'Information we collect',
                icon: Database,
                body: [
                    'We may collect account details, business contact information, candidate profile information, resumes, role requirements, communications, usage events, device data, and support messages.',
                    'For WhatsApp-enabled workflows, we may process phone numbers, message content, delivery metadata, and interaction history needed to provide the requested service.',
                ],
            },
            {
                title: 'How we use information',
                icon: Sparkles,
                body: [
                    'We use personal data to operate kruit.ai, authenticate users, automate recruiter workflows, communicate with candidates, score and match candidates, provide customer support, prevent abuse, and improve reliability.',
                    'We may also use aggregated or de-identified information for analytics, product quality, and service improvement.',
                ],
            },
            {
                title: 'Sharing and subprocessors',
                icon: Globe2,
                body: [
                    'We share data only as needed with trusted service providers that help us host, secure, analyze, and deliver the platform, including communication providers such as WhatsApp/Meta where the customer uses those channels.',
                    'We may disclose information to comply with law, protect rights and safety, enforce agreements, or support a corporate transaction. We do not sell personal data.',
                ],
            },
            {
                title: 'Retention and deletion',
                icon: Clock3,
                body: [
                    'We keep personal data only for as long as needed to provide the service, meet contractual obligations, comply with law, resolve disputes, and maintain security records.',
                    `To request access, correction, export, or deletion, email ${contactEmail}. We aim to respond promptly and complete verified deletion requests within 30 days unless a longer period is legally required.`,
                ],
            },
            {
                title: 'Security',
                icon: LockKeyhole,
                body: [
                    'We use reasonable administrative, technical, and organizational safeguards designed to protect personal data from unauthorized access, loss, misuse, alteration, and disclosure.',
                    'No internet service is perfectly secure, but we continuously work to improve platform security and limit access to people and systems that need it.',
                ],
            },
            {
                title: 'Contact',
                icon: Mail,
                body: [
                    `For privacy questions, data subject requests, or Meta app review inquiries, contact us at ${contactEmail}.`,
                    'If you interact with kruit.ai through an employer or recruiter, that organization may also be responsible for responding to certain requests about your data.',
                ],
            },
        ],
    },
    dataDeletion: {
        eyebrow: 'User Data Deletion',
        title: 'Data Deletion Instructions',
        subtitle:
            'A clear way to request deletion of personal data associated with kruit.ai, including WhatsApp conversations and Meta-connected app interactions.',
        effectiveDate: 'Available for Meta app review',
        primaryAction: 'Email deletion request',
        primaryHref: `mailto:${contactEmail}?subject=Data%20Deletion%20Request`,
        heroIcon: Trash2,
        highlights: [
            'Email ops@kruit.ai with the phone number or account identifier used with kruit.ai.',
            'We verify the request before deleting data.',
            'Verified deletion requests are completed within 30 days.',
        ],
        sections: [
            {
                title: 'How to request deletion',
                icon: MessageCircle,
                body: [
                    `To request deletion of any data associated with your WhatsApp interactions with kruit.ai, email ${contactEmail} with your phone number. We will delete your data within 30 days.`,
                    'If your request relates to a web account or another Meta-connected interaction, include the email address, phone number, or account identifier you used with kruit.ai so we can locate the correct records.',
                ],
            },
            {
                title: 'What we delete',
                icon: Database,
                body: [
                    'We delete personal data we control that is associated with the verified identifier, including relevant conversation records, contact details, candidate interaction data, and support context where applicable.',
                    'Some records may be retained when required for security, fraud prevention, legal compliance, billing, dispute resolution, or backup integrity, and will be handled according to our retention practices.',
                ],
            },
            {
                title: 'Verification',
                icon: UserCheck,
                body: [
                    'We may ask for limited information to confirm that the requester is authorized to delete the data tied to the phone number, account, or interaction.',
                    'If kruit.ai processes your data on behalf of an employer, recruiter, or customer, we may coordinate with that organization to complete the request.',
                ],
            },
            {
                title: 'Completion timeline',
                icon: Clock3,
                body: [
                    'We aim to acknowledge deletion requests promptly and complete verified deletion requests within 30 days.',
                    'After deletion, some copies may remain temporarily in encrypted backups or logs until they expire through normal retention cycles.',
                ],
            },
        ],
    },
    gdpr: {
        eyebrow: 'GDPR',
        title: 'GDPR & Data Rights',
        subtitle:
            'Information for individuals in the EEA, UK, and other regions with privacy rights about how to exercise access, correction, export, objection, and deletion requests.',
        effectiveDate: 'Effective May 25, 2026',
        primaryAction: 'Exercise data rights',
        primaryHref: `mailto:${contactEmail}?subject=GDPR%20Data%20Rights%20Request`,
        heroIcon: Fingerprint,
        highlights: [
            'You can request access, correction, deletion, portability, restriction, or objection.',
            'We process data under contract, legitimate interests, consent, and legal obligations where applicable.',
            'Verified GDPR requests can be sent to ops@kruit.ai.',
        ],
        sections: [
            {
                title: 'Roles and responsibility',
                icon: FileText,
                body: [
                    'For most recruiting workflows, kruit.ai acts as a processor or service provider on behalf of the employer, recruiter, or customer using our platform.',
                    'For account administration, website inquiries, security, and direct business communications, kruit.ai may act as an independent controller.',
                ],
            },
            {
                title: 'Legal bases',
                icon: CheckCircle2,
                body: [
                    'Depending on the context, we process personal data to perform a contract, support legitimate business interests, comply with legal obligations, protect security, or act with consent where required.',
                    'Customers using kruit.ai are responsible for ensuring they have an appropriate legal basis for the candidate and hiring data they upload or process through the platform.',
                ],
            },
            {
                title: 'Your rights',
                icon: Fingerprint,
                body: [
                    'You may have the right to request access to your personal data, correction of inaccurate data, deletion, portability, restriction of processing, objection to processing, or withdrawal of consent.',
                    `To exercise these rights, email ${contactEmail} and include the email address, phone number, or identifier you used with kruit.ai.`,
                ],
            },
            {
                title: 'International transfers',
                icon: Globe2,
                body: [
                    'kruit.ai may process data using cloud infrastructure and service providers located in different countries.',
                    'Where required, we use appropriate contractual and organizational safeguards for international transfers of personal data.',
                ],
            },
            {
                title: 'Response timeline',
                icon: Clock3,
                body: [
                    'We aim to respond to verified GDPR requests within the time required by applicable law.',
                    'If we process your data for a customer, we may refer or coordinate your request with that customer because they may be the controller responsible for the underlying recruiting activity.',
                ],
            },
        ],
    },
    terms: {
        eyebrow: 'Terms & Conditions',
        title: 'Terms and Conditions',
        subtitle:
            'The terms that govern access to and use of kruit.ai, including our website, recruiting platform, AI workflows, and communication channels.',
        effectiveDate: 'Effective May 25, 2026',
        primaryAction: 'Contact operations',
        primaryHref: `mailto:${contactEmail}?subject=Terms%20and%20Conditions%20Question`,
        heroIcon: Scale,
        highlights: [
            'Use kruit.ai only for lawful recruiting, candidate engagement, and business purposes.',
            'Customers are responsible for the data, job requirements, and communications they submit.',
            'Questions about these terms can be sent to ops@kruit.ai.',
        ],
        sections: [
            {
                title: 'Acceptance of terms',
                icon: FileText,
                body: [
                    'By accessing or using kruit.ai, you agree to these Terms and Conditions and any applicable order forms, product terms, or agreements between kruit.ai and your organization.',
                    'If you use kruit.ai on behalf of a company or other organization, you represent that you are authorized to accept these terms for that organization.',
                ],
            },
            {
                title: 'Permitted use',
                icon: CheckCircle2,
                body: [
                    'kruit.ai is provided for legitimate recruiting, hiring, candidate engagement, workflow automation, and related business operations.',
                    'You may not misuse the service, attempt unauthorized access, interfere with platform security, scrape the service, reverse engineer restricted components, or use kruit.ai in violation of applicable law.',
                ],
            },
            {
                title: 'Customer content and responsibility',
                icon: Database,
                body: [
                    'Customers and users are responsible for the resumes, candidate data, job descriptions, messages, instructions, and other content they submit to kruit.ai.',
                    'You are responsible for ensuring you have the rights, notices, permissions, and legal basis needed to process candidate or business data through the platform.',
                ],
            },
            {
                title: 'AI-assisted outputs',
                icon: Sparkles,
                body: [
                    'kruit.ai may provide AI-generated summaries, scores, recommendations, message drafts, and workflow outputs. These outputs are intended to assist human review and decision-making.',
                    'You are responsible for reviewing outputs before relying on them, sending them, or using them in employment-related decisions. kruit.ai does not replace independent human judgment.',
                ],
            },
            {
                title: 'Accounts and security',
                icon: LockKeyhole,
                body: [
                    'You are responsible for keeping account credentials confidential and for activity that occurs under your account.',
                    'Notify us promptly at ops@kruit.ai if you believe your account, workspace, or integration has been accessed without authorization.',
                ],
            },
            {
                title: 'Third-party services',
                icon: Globe2,
                body: [
                    'kruit.ai may integrate with third-party services such as communication providers, cloud services, or customer-selected systems. Their own terms and policies may apply.',
                    'We are not responsible for third-party services outside our control, but we work to use reputable providers and reasonable safeguards where they support the platform.',
                ],
            },
            {
                title: 'Changes, suspension, and contact',
                icon: Clock3,
                body: [
                    'We may update the service or these terms from time to time. Material updates will be reflected on this page or communicated through reasonable channels.',
                    'We may suspend or restrict access when needed to protect the service, comply with law, prevent misuse, or address security concerns. For questions, contact ops@kruit.ai.',
                ],
            },
        ],
    },
};

export default function LegalPage({ page }: { page: LegalPageKey }) {
    const content = legalPages[page];
    const HeroIcon = content.heroIcon;

    return (
        <div className="min-h-screen overflow-hidden">
            <Navigation />
            <main className="relative pt-9 sm:pt-19">
                <section className="relative border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 pt-26 pb-26 sm:pt-30 sm:pb-32">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[48px_48px] opacity-30" />
                    <div className="relative max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: -20 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-bold tracking-widest text-slate-700 uppercase shadow-sm">
                                <HeroIcon className="h-4 w-4 text-primary" />
                                {content.eyebrow}
                            </span>
                            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 leading-tight tracking-normal">
                                {content.title}
                            </h1>
                            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-8 max-w-3xl">
                                {content.subtitle}
                            </p>

                            <div className="mt-8 grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-3">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Document status</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">{content.effectiveDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Data contact</p>
                                    <a href={`mailto:${contactEmail}`} className="mt-1 block text-sm font-semibold text-primary hover:text-blue-700">
                                        {contactEmail}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Request handling</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">Verified requests reviewed promptly</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Button asChild size="xl" className="bg-primary text-white hover:bg-blue-700">
                                    <a href={content.primaryHref}>
                                        {content.primaryAction}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-slate-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl mx-auto"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">At a glance</p>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {content.highlights.map((highlight) => (
                                <div key={highlight} className="border-l-2 border-primary bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                                    <CheckCircle2 className="mb-3 h-5 w-5 text-primary" />
                                    <p className="text-sm leading-6 text-slate-700">{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="border border-slate-200 bg-slate-50 px-5 py-4 sm:px-6"
                        >
                            <p className="text-sm leading-7 text-slate-600">
                                This page is provided as a public compliance notice for kruit.ai users, customers,
                                candidates, and app review teams. It is designed to be readable at a stable public URL.
                            </p>
                        </motion.div>

                        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
                            {content.sections.map((section, index) => {
                                const SectionIcon = section.icon;
                                const sectionNumber = String(index + 1).padStart(2, '0');

                                return (
                                    <motion.article
                                        key={section.title}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="group py-8 sm:py-10"
                                    >
                                        <div className="grid gap-5 sm:grid-cols-[96px_1fr]">
                                            <div className="flex items-center gap-3 sm:block">
                                                <span className="block text-sm font-bold tracking-widest text-slate-400">
                                                    {sectionNumber}
                                                </span>
                                                <div className="mt-0 sm:mt-4 h-11 w-11 shrink-0 rounded-md border border-slate-200 bg-white text-primary flex items-center justify-center shadow-sm transition-colors group-hover:border-blue-200">
                                                <SectionIcon className="h-5 w-5" />
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-xl sm:text-2xl font-bold text-slate-950">{section.title}</h2>
                                                <div className="mt-4 space-y-4">
                                                    {section.body.map((paragraph) => (
                                                        <p key={paragraph} className="text-sm sm:text-base text-slate-600 leading-7 sm:leading-8">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="mt-10 flex flex-col gap-5 border border-slate-200 bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
                        >
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Questions or requests</p>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                                    Send privacy, GDPR, or data deletion requests to our operations team with the relevant account identifier.
                                </p>
                            </div>
                            <Button asChild size="xl">
                                <a href={content.primaryHref}>
                                    Contact
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
