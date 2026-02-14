export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-400 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <div className="text-2xl font-bold text-blue-500 mb-4">kruit.ai</div>
                        <p className="text-gray-500 leading-relaxed">AI-native hiring infrastructure for engineering teams that move fast.</p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Case Studies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2026 kruit.ai. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
