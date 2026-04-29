import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Pricing() {
    const plans = [
        {
            tier: 'STARTER',
            name: 'Try it out',
            price: 'Free',
            priceDetail: 'credits on signup',
            description: 'No credit card required to start',
            features: [
                'All features unlocked immediately',
                'Email agent included',
                'Resume intelligence + kruit score',
                'WhatsApp + voice agents (credit-based)',
                'In-app credit balance for all recruiters',
            ],
            cta: 'Get started free',
        },
        {
            tier: 'GROWTH',
            name: 'Scale hiring',
            price: 'Credits',
            priceDetail: 'top-up as needed',
            description: 'Pay only for what you use',
            features: [
                'Everything in Starter',
                'Priority recruiter dashboard support',
                'Cross-role matching agent',
                'Advanced conflict detection reports',
                'JD-level threshold configuration',
            ],
            cta: 'Contact sales',
            highlighted: true,
        },
        {
            tier: 'ENTERPRISE',
            name: 'Custom scale',
            price: 'Talk to us',
            priceDetail: 'Custom volume pricing + SLAs',
            description: 'Custom volume pricing + SLAs',
            features: [
                'Everything in Growth',
                'Dedicated account management',
                'ATS integration (Greenhouse, Workday)',
                'SOC 2 compliance documentation',
                'Multi-region deployment available',
            ],
            cta: 'Contact sales',
        },
    ];

    const creditUsage = [
        { action: 'Candidate scoring (resume + enrichment)', cost: '1 credit' },
        { action: 'Email sent (initial + follow-up)', cost: '1 credit' },
        { action: 'WhatsApp message sent', cost: '2 credits' },
        { action: 'Voice call', cost: '4 credits / min' },
        { action: 'Recruiter dashboard AI responses', cost: 'Free — no credits' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-primary font-bold text-xs tracking-widest uppercase mb-3">PRICING</p>
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Simple, usage-based credits.<br />All features from day one.
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        No feature gating. No per-seat surprises. Buy credits and use them across any channel — email, WhatsApp, or voice.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid gap-6 md:grid-cols-3 mb-20">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.tier}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`rounded-2xl p-8 transition-all duration-300 border-2 ${
                                plan.highlighted
                                    ? 'border-primary bg-white shadow-2xl relative'
                                    : 'border-gray-200 bg-white hover:border-primary'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 right-6 translate-y-1/2">
                                    <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}
                            <p className="text-primary font-bold text-xs tracking-widest uppercase mb-2">{plan.tier}</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">{plan.description}</p>
                            
                            <div className="mb-8">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                                    <span className="text-4xl sm:text-5xl font-bold text-primary leading-none">{plan.price}</span>
                                    <span className="text-sm sm:text-base text-gray-600">{plan.priceDetail}</span>
                                </div>
                            </div>

                            <Button
                                className={`w-full mb-8 font-semibold ${
                                    plan.highlighted
                                        ? 'bg-linear-to-r from-primary to-cyan-500 text-white hover:opacity-90'
                                        : 'border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white'
                                }`}
                                size="lg"
                            >
                                {plan.cta}
                            </Button>

                            <div className="space-y-3">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Credit Usage Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 sm:mt-32 max-w-4xl mx-auto"
                >
                    <div className="text-center mb-10 sm:mb-12">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                            TRANSPARENT PRICING
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Credit usage — what each action costs</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        {creditUsage.map((row, index) => (
                            <div
                                key={index}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-8 sm:py-6 rounded-2xl transition-all duration-300 ${
                                    index !== creditUsage.length - 1 ? 'border-b border-slate-50' : ''
                                } hover:bg-slate-50 hover:scale-[1.01] group`}
                            >
                                <span className="text-base sm:text-lg font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                                    {row.action}
                                </span>
                                <span className={`w-fit text-sm sm:text-base font-bold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors duration-300 ${
                                    row.cost.includes('Free') 
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-100/50' 
                                        : 'bg-blue-50 text-primary border border-blue-100 group-hover:bg-blue-100/50'
                                }`}>
                                    {row.cost}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
