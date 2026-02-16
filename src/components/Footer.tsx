export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-400 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 md:gap-20">
                    <div className="max-w-90">
                        <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-3 sm:mb-4">kruit.ai</div>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">AI-native hiring infrastructure for engineering teams that move fast.</p>
                    </div>
                    <div className="flex justify-between w-full md:max-w-[70%] py-4 flex-1">
                        <div>
                            <h3 className="text-white font-bold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wider">Product</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wider">Company</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-3 sm:mb-4 uppercase text-xs sm:text-sm tracking-wider">Resources</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Case Studies
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm sm:text-base hover:text-white transition-colors">
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">© 2026 kruit.ai. All rights reserved.</p>
                        <div className="flex gap-4 sm:gap-6">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
