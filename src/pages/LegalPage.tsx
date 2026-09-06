import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    AlertTriangle,
    ArrowRight,
    Baby,
    BookOpen,
    Bot,
    CheckCircle2,
    Clock3,
    Cookie,
    Copyright,
    CreditCard,
    Database,
    FileText,
    Fingerprint,
    Gavel,
    Globe2,
    Handshake,
    History,
    LockKeyhole,
    Mail,
    MessageCircle,
    Radio,
    Scale,
    ScrollText,
    Settings,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Trash2,
    UserCheck,
    Users,
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
            'How kruit.ai — operated by Chintanlabs Infotech Pvt. Ltd. — collects, uses, and protects personal data through the kruit.ai platform, for both Customers and Candidates.',
        effectiveDate: 'Effective 25 May 2026 · Last updated 2 September 2026',
        primaryAction: 'Request privacy support',
        primaryHref: `mailto:${contactEmail}`,
        heroIcon: ShieldCheck,
        highlights: [
            'kruit.ai processes Candidate data as a processor, acting on the Customer\'s instructions — the Customer is the data controller for Candidate data.',
            'We do not sell personal data. Verified deletion requests are purged from active systems within 30 days and backups within 90 days.',
            'Privacy questions, data deletion requests, or compliance matters: ops@kruit.ai.',
        ],
        sections: [
            {
                title: 'Our role: processor vs. controller',
                icon: Scale,
                body: [
                    "kruit.ai processes Candidate data as a data processor, acting solely on the instructions of the Customer — the hiring organisation, GCC team, or recruiter that contracts to use the Platform. The Customer is the data controller for Candidate data and is responsible for the lawfulness of collecting and submitting it to the Platform, including obtaining Candidate consent.",
                    'If you are a Candidate and have questions about how your data was submitted to us, please contact the hiring organisation directly — we can also help you get in touch with them.',
                    'For data we collect directly from Customers and website visitors (e.g., account and billing information, website analytics), kruit.ai acts as the data controller.',
                ],
            },
            {
                title: 'Categories of data we process',
                icon: Database,
                body: [
                    "On the Customer's behalf, the Platform processes: Identity data (name, contact details, phone number, email address); Professional data (resume content, employment history, skills, qualifications, GitHub/portfolio links); Preference data (salary expectations, notice period, remote/relocation preferences, work style signals); Enrichment data (publicly available information from GitHub, HuggingFace, and personal portfolios used to validate resume claims); and Interaction data (responses to WhatsApp, email, and voice outreach, and engagement signals).",
                    'For Customers and Authorised Users, we collect account details, billing information, and usage data. For website visitors, we may collect standard analytics data (pages visited, browser type, referral source) via cookies.',
                ],
            },
            {
                title: 'How we use personal data',
                icon: Sparkles,
                body: [
                    'We use the categories above to parse, enrich, and cross-reference resumes and flag discrepancies as screening questions; generate the kruit Score — a multi-dimensional, AI-generated 0–100 suitability assessment against a specific job description; conduct AI-driven outreach via email, WhatsApp, and voice and record engagement signals; re-rank and re-evaluate historical candidates against new open roles (Candidate Rediscovery); and operate, secure, and improve the Platform, including administering Customer accounts and billing.',
                    "The kruit Score is a decision-support tool only. It is not a final determination of a Candidate's suitability for employment, and Customers are contractually required to have a qualified human reviewer evaluate AI-generated outputs before any hiring decision is made or communicated.",
                ],
            },
            {
                title: 'Consent and your choices as a Candidate',
                icon: CheckCircle2,
                body: [
                    'The Customer that submitted your data is responsible for obtaining your consent, informing you that AI-powered evaluation, scoring, and outreach will be conducted, and securing opt-in consent specifically for WhatsApp and voice outreach.',
                    'You have the right to ask the Customer or kruit.ai what data of yours has been processed; opt out of automated communications at any time — opt-outs are honoured immediately and opted-out numbers/addresses are not re-contacted through the Platform; and request correction or deletion of your data.',
                ],
            },
            {
                title: 'Explainability',
                icon: FileText,
                body: [
                    'The Platform provides explainable outputs, including conflict resolution logs and score rationale, so that Customers can meet obligations to explain automated decisions under applicable law — including the EU AI Act, India\'s DPDP Act 2023, the UAE Federal Decree-Law No. 45 of 2021, the Saudi Personal Data Protection Law, and DIFC/ADGM data protection regulations.',
                ],
            },
            {
                title: 'Sharing and sub-processors',
                icon: Users,
                body: [
                    'We do not sell personal data. We share data with sub-processors who help us run the Platform, including AWS, Google Cloud Platform, and WhatsApp Business API (Meta). A current list is available on request at ops@kruit.ai, and we will notify Customers of material changes with reasonable advance notice.',
                    "We also share data with Meta for WhatsApp outreach, subject to Meta's Business Messaging Policy — we are not liable for message delivery failures, delays, or Meta's policy enforcement actions — and with law enforcement or regulators where required by law.",
                ],
            },
            {
                title: 'Data retention and deletion',
                icon: Clock3,
                body: [
                    "Candidate and Customer Data is retained for the duration of the active subscription plus 90 days. You (or the Customer, on your behalf) may request earlier deletion by contacting ops@kruit.ai.",
                    "On a verified deletion request, we purge data from active systems within 30 days and from backups within 90 days. On termination of a Customer's subscription, the Customer may export its data within 30 days, after which it is deleted per this schedule.",
                ],
            },
            {
                title: 'Cookies and website analytics',
                icon: Cookie,
                body: [
                    'Our website uses cookies and similar technologies to operate core functionality and understand aggregate usage. You can control cookies through your browser settings. Disabling non-essential cookies will not affect your ability to use core website features.',
                ],
            },
            {
                title: 'International data transfers',
                icon: Globe2,
                body: [
                    'As a platform serving hiring teams across India and the GCC, personal data may be transferred to and processed in jurisdictions other than where you are located, including where our sub-processors operate.',
                    'Where required by applicable law (GDPR, India\'s DPDP Act 2023, the UAE PDPL, the Saudi PDPL, or DIFC/ADGM regulations), we rely on appropriate safeguards and, where applicable, enter into a Data Processing Agreement with the Customer, available on request at ops@kruit.ai.',
                ],
            },
            {
                title: 'Security',
                icon: LockKeyhole,
                body: [
                    'We implement industry-standard technical and organisational measures to protect personal data, including encryption in transit and at rest, access controls, and regular security reviews.',
                    'Suspected data incidents should be reported to ops@kruit.ai; we investigate and, where required, notify affected parties within 48 hours of confirming an incident.',
                ],
            },
            {
                title: 'Your rights',
                icon: Fingerprint,
                body: [
                    'Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data, object to certain processing, or lodge a complaint with a supervisory authority.',
                    'To exercise these rights, contact us at ops@kruit.ai; if you are a Candidate, we may direct your request to the relevant Customer where they are the controller of your data.',
                ],
            },
            {
                title: "Children's privacy",
                icon: Baby,
                body: [
                    'The Platform is intended for use by working professionals and hiring organisations. It is not directed at, and we do not knowingly collect personal data from, individuals under the age of 18.',
                ],
            },
            {
                title: 'Changes to this policy',
                icon: History,
                body: [
                    "We may update this Privacy Policy from time to time. Material changes will be posted at kruit.ai/privacy-policy with at least 30 days' notice where required. Continued use of the Platform after the effective date constitutes acceptance of the updated policy.",
                ],
            },
            {
                title: 'Contact',
                icon: Mail,
                body: [
                    `For privacy questions, data deletion requests, or compliance matters, contact kruit.ai — Chintanlabs Infotech Pvt. Ltd. — at ${contactEmail} or via https://kruit.ai.`,
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
        eyebrow: 'Terms of Service',
        title: 'Terms of Service',
        subtitle:
            'The binding agreement between kruit.ai — operated by Chintanlabs Infotech Pvt. Ltd. — and the Customer accessing or using the kruit.ai platform and services.',
        effectiveDate: 'Effective 25 May 2026 · Last updated 2 September 2026',
        primaryAction: 'Contact operations',
        primaryHref: `mailto:${contactEmail}?subject=Terms%20of%20Service%20Question`,
        heroIcon: Scale,
        highlights: [
            'The Customer is solely responsible for obtaining Candidate consent — kruit.ai processes Candidate data only as a processor, on the Customer\'s instructions.',
            'The kruit Score is a decision-support tool only; a qualified human reviewer must evaluate AI outputs before any hiring decision.',
            'Governed by the laws of India, with disputes resolved by arbitration seated in Bengaluru, Karnataka.',
        ],
        sections: [
            {
                title: 'Introduction and acceptance',
                icon: BookOpen,
                body: [
                    'These Terms constitute a legally binding agreement between kruit.ai, operated by Chintanlabs Infotech Pvt. Ltd., and the Customer accessing or using the kruit.ai platform and services.',
                    'By accessing the platform, signing an order form, or otherwise using our services, you confirm that you have read, understood, and agree to be bound by these Terms. If you are accepting on behalf of an organisation, you represent that you have authority to bind that organisation. If you do not agree to these Terms, you must not use the services.',
                ],
            },
            {
                title: 'Definitions',
                icon: ScrollText,
                body: [
                    '"Platform" means the kruit.ai web application, APIs, AI agents, and associated tools. "Services" means all Platform features, including resume intelligence, candidate scoring, multi-channel outreach (email, WhatsApp, voice), ATS integration, and candidate rediscovery.',
                    '"Customer" means the hiring organisation, GCC team, or recruiter that has contracted to use the Platform. "Candidate" means any individual whose data is submitted to or processed by the Platform by the Customer. "Customer Data" means all data uploaded or processed through the Platform by or on behalf of the Customer, including resumes, job descriptions, and candidate information.',
                    '"kruit Score" means the AI-generated 0–100 suitability score assigned to Candidates relative to a specific job description. "Authorised Users" means employees or contractors of the Customer permitted to access the Platform.',
                ],
            },
            {
                title: 'Description of services',
                icon: Bot,
                body: [
                    'Core capabilities include Resume Intelligence (parsing, enrichment, and cross-referencing of resumes against GitHub, portfolios, and HuggingFace, with discrepancies flagged as screening questions); Role-Fit Matching (multi-dimensional scoring against a specific job description); Automated Outreach (AI-driven, personalised first-touch outreach via email, WhatsApp, and voice); Decision-Ready Profiles (kruit Score, conflict resolution log, intent signals, and suggested interview questions); Candidate Rediscovery (re-ranking historical ATS candidates against current open roles); and Orchestrated AI Agents (Evaluation, Outreach, and Rediscovery agents operating in an always-on loop).',
                    'We aim to provide 99.5% uptime excluding scheduled maintenance, with reasonable advance notice of planned downtime. We do not guarantee uninterrupted or error-free operation and are not liable for outages caused by third-party services, including cloud providers, the WhatsApp Business API, or telephony providers.',
                ],
            },
            {
                title: 'Customer obligations and responsibilities',
                icon: UserCheck,
                body: [
                    "Candidate consent is a critical Customer obligation. The Customer is solely responsible for obtaining all necessary consents before submitting Candidate data; informing Candidates that AI-powered evaluation, scoring, and outreach will be conducted; ensuring opt-in consent for WhatsApp and voice outreach; and providing Candidates a clear mechanism to opt out. kruit.ai processes Candidate data as a processor acting on the Customer's instructions — the Customer remains the data controller under applicable law.",
                    'Customers must not use the Platform to contact individuals who have not consented or have opted out; apply discriminatory screening criteria based on protected characteristics; submit false or impersonated candidate data; circumvent rate limits or security controls; resell or sub-licence access without written consent; or use the Platform for any purpose other than legitimate recruitment.',
                    'Customers are responsible for all actions taken by their Authorised Users, must not share credentials, and must notify kruit.ai promptly of any unauthorised access.',
                ],
            },
            {
                title: 'AI-generated outputs and human oversight',
                icon: ShieldAlert,
                body: [
                    "The kruit Score (0–100) is a decision-support tool generated by AI models, reflecting the Platform's assessment at a point in time. It is not a final determination of a Candidate's suitability for employment.",
                    'Customers must ensure a qualified human reviewer evaluates AI-generated outputs before making or communicating any hiring decision, rejection, or adverse employment action. kruit.ai does not make hiring decisions and is not liable for employment outcomes resulting from reliance on Platform outputs without adequate human review.',
                    "AI-generated outputs may contain errors or reflect limitations in underlying data sources — the Customer is responsible for verifying material information before acting on them. The Platform provides explainable outputs, including conflict resolution logs and score rationale; Customers in jurisdictions requiring explanation of automated decisions (e.g., the EU AI Act, India's DPDP Act 2023, the UAE Federal Decree-Law No. 45 of 2021, the Saudi PDPL, or DIFC/ADGM regulations) are responsible for their own compliance obligations.",
                ],
            },
            {
                title: 'Data processing and privacy',
                icon: Database,
                body: [
                    'The categories of data processed, retention, sub-processors, and security measures are set out in our Privacy Policy, which forms part of these Terms.',
                    "Where required by applicable law (GDPR, India's DPDP Act 2023, the UAE Federal Decree-Law No. 45 of 2021, the Saudi PDPL, or DIFC/ADGM regulations), the parties will enter into a Data Processing Agreement. Our standard DPA is available on request at ops@kruit.ai.",
                ],
            },
            {
                title: 'WhatsApp and multi-channel outreach',
                icon: Radio,
                body: [
                    "Outreach via WhatsApp is conducted through the Meta WhatsApp Business Platform and is subject to Meta's Business Messaging Policy. The Customer agrees to only initiate outreach to Candidates who have provided their number through a legitimate recruitment process and consented to WhatsApp contact; comply with message template approval requirements; honour opt-out requests immediately and not re-contact opted-out numbers; and not use outreach for marketing or non-recruitment communications.",
                    "kruit.ai is not liable for message delivery failures, delays, or policy enforcement actions by Meta.",
                ],
            },
            {
                title: 'Intellectual property',
                icon: Copyright,
                body: [
                    'All intellectual property rights in the Platform — including AI models, algorithms, scoring logic, software, and branding — remain the exclusive property of kruit.ai. These Terms do not grant the Customer any ownership interest in the Platform.',
                    'The Customer retains all ownership rights in Customer Data and grants kruit.ai a limited, non-exclusive licence to process it solely to provide the Services. If the Customer provides feedback or suggestions, kruit.ai may use it without restriction or compensation.',
                ],
            },
            {
                title: 'Confidentiality',
                icon: LockKeyhole,
                body: [
                    "Each party agrees to keep confidential the other party's non-public business information disclosed in connection with these Terms. This does not apply to information that is publicly available, independently developed, or required to be disclosed by law. Confidentiality obligations survive termination for three (3) years.",
                ],
            },
            {
                title: 'Fees and payment',
                icon: CreditCard,
                body: [
                    "Fees are as specified in the applicable order form or subscription agreement, exclusive of applicable taxes. Invoices are due within 30 days of issue unless otherwise agreed.",
                    "We reserve the right to suspend Services for non-payment after 15 days' written notice. Fees are non-refundable except as expressly stated in the order form or required by law.",
                ],
            },
            {
                title: 'Limitation of liability',
                icon: AlertTriangle,
                body: [
                    'The Platform is provided "as is". To the maximum extent permitted by law, kruit.ai disclaims all warranties, express or implied, including fitness for a particular purpose, accuracy of AI outputs, and uninterrupted service.',
                    "kruit.ai's total liability shall not exceed the fees paid by the Customer in the three (3) months preceding the claim. This cap does not apply to breach of confidentiality, kruit.ai's IP indemnification obligations, the Customer's indemnification obligations, or either party's fraud, gross negligence, or wilful misconduct. Where no fees have yet been paid (including during a trial), the cap for claims outside those exceptions is the greater of fees paid to date, the amount in the order form, or USD 5,000.",
                    'kruit.ai is not liable for indirect, incidental, special, or consequential damages, nor for any hiring outcome, employment dispute, discrimination claim, or regulatory action arising from the Customer\'s use of Platform outputs in employment decisions.',
                ],
            },
            {
                title: 'Indemnification',
                icon: Handshake,
                body: [
                    "The Customer agrees to indemnify kruit.ai from claims, losses, or expenses arising from the Customer's breach of these Terms, failure to obtain required Candidate consents, use of Platform outputs in violation of applicable law, or third-party claims relating to Customer Data submitted to the Platform.",
                    'kruit.ai agrees to indemnify the Customer from third-party claims that the Platform, as provided and used in accordance with these Terms, infringes that party\'s intellectual property rights — excluding claims arising from Customer Data, unauthorised modification, or use combined with non-kruit.ai products. kruit.ai may, at its option, procure continued rights, replace or modify the Platform, or terminate the affected Services and refund unused prepaid fees.',
                ],
            },
            {
                title: 'Term and termination',
                icon: Clock3,
                body: [
                    "These Terms commence on acceptance and continue for the subscription period in the order form, renewing automatically unless either party gives 30 days' written notice of non-renewal.",
                    'Either party may terminate immediately on written notice if the other materially breaches these Terms and fails to remedy within 14 days, or becomes insolvent. On termination, Platform access ceases; the Customer may request a data export within 30 days, after which data is deleted per our Privacy Policy.',
                ],
            },
            {
                title: 'Governing law and dispute resolution',
                icon: Gavel,
                body: [
                    'These Terms are governed by the laws of India. Disputes are first referred to good-faith negotiation; if unresolved within 30 days, they are submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, seated in Bengaluru, Karnataka, India, conducted in English.',
                    'Nothing in this clause prevents either party from seeking urgent injunctive relief from a court of competent jurisdiction.',
                ],
            },
            {
                title: 'General provisions',
                icon: Settings,
                body: [
                    'These Terms, together with any order form and DPA, constitute the entire agreement between the parties. We may update these Terms by posting a revised version at kruit.ai/terms with at least 30 days\' notice for material changes; continued use after the effective date constitutes acceptance.',
                    'If any provision is held invalid, the remaining provisions continue in force. Failure to enforce a provision is not a waiver of the right to enforce it later. Neither party is liable for delays caused by events beyond their reasonable control. The Customer may not assign these Terms without our prior written consent; we may assign them in connection with a merger or acquisition.',
                ],
            },
            {
                title: 'Contact',
                icon: Mail,
                body: [
                    `For questions about these Terms or compliance matters, contact kruit.ai — Chintanlabs Infotech Pvt. Ltd. — at ${contactEmail} or via https://kruit.ai.`,
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
