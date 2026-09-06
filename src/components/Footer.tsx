export default function Footer() {
    return (
        <footer className="bg-[#0B1121] text-gray-400 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
                    {/* Left Section */}
                    <div className="max-w-xs">
                        <div className="mb-6">
                            <img 
                                src={`${import.meta.env.BASE_URL}logo.png`} 
                                alt="kruit.ai logo" 
                                className="h-8 w-auto brightness-0 invert opacity-90" 
                            />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            AI-driven, bias-aware candidate engagement and cross-role matching for modern recruiting teams.
                        </p>
                        <p className="text-sm text-gray-500">
                            © 2026 kruit.ai · Beta · India
                        </p>
                    </div>

                    {/* Right Section (Links) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
                        <div>
                            <h3 className="text-white font-semibold mb-4 sm:mb-6 uppercase text-xs tracking-wider">PRODUCTS</h3>
                            <ul className="space-y-3 sm:space-y-4">
                                <li>
                                    <a href="/?product=recruiter" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                        AI Recruiter
                                        <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase">Live</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/?product=interviewer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                        AI Interviewer
                                        <span className="px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase whitespace-nowrap">Coming soon</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 sm:mb-6 uppercase text-xs tracking-wider">COMPANY</h3>
                            <ul className="space-y-3 sm:space-y-4">
                                <li>
                                    <a href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 sm:mb-6 uppercase text-xs tracking-wider">LEGAL</h3>
                            <ul className="space-y-3 sm:space-y-4">
                                <li>
                                    <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Privacy policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        Terms of service
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:hello@kruit.ai" className="text-sm text-gray-400 hover:text-white transition-colors">
                                        hello@kruit.ai
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800/60 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
                        Beta · Available in India · Design partners only
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <a href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm">
                            Privacy
                        </a>
                        <a href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm">
                            Terms
                        </a>
                        <a href="mailto:hello@kruit.ai" className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm">
                            hello@kruit.ai
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
