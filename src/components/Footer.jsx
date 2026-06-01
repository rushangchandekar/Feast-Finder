import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', hoverColor: 'hover:text-blue-400' },
  { icon: FaInstagram, href: '#', label: 'Instagram', hoverColor: 'hover:text-pink-400' },
  { icon: FaTwitter, href: '#', label: 'Twitter', hoverColor: 'hover:text-sky-400' },
  { icon: FaYoutube, href: '#', label: 'YouTube', hoverColor: 'hover:text-red-400' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore Recipes', href: '/#recipes' },
  { label: 'SmartChef AI', href: '/smartchef' },
  { label: 'About Us', href: '#' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'License Agreement', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const Footer = () => {
    return (
        <footer className="relative bg-gray-50 dark:bg-[hsl(220,20%,4%)] border-t border-gray-200 dark:border-white/[0.06]">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            
            <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 py-14 md:py-16">
                    
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-flex items-center gap-2 mb-5">
                            <img src="/logo1.png" alt="FeastFinder" className="h-8 w-auto dark:brightness-110" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Feast<span className="gradient-text">Finder</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            Your ultimate culinary companion — connecting food enthusiasts with delicious recipes and AI-powered cooking solutions.
                        </p>
                        
                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className={`p-2 rounded-full bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-gray-500 ${social.hoverColor} hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300`}
                                    aria-label={social.label}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    {link.href.startsWith('/#') || link.href === '#' ? (
                                        <a
                                            href={link.href}
                                            className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors" />
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors" />
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
                            Stay Updated
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                            Subscribe for the latest recipes, cooking tips, and feature updates.
                        </p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="your@email.com" 
                                className="flex-1 px-4 py-2.5 bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-200 rounded-xl text-sm
                                focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:focus:ring-emerald-400/20 focus:border-emerald-300 dark:focus:border-emerald-500/30
                                placeholder:text-gray-400 dark:placeholder:text-gray-600
                                transition-all duration-300"
                            />
                            <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300">
                                Join
                            </button>
                        </div>
                        
                        {/* Contact info */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                <MdEmail className="text-emerald-500/60" size={14} />
                                <span>info@feastfinder.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                <MdLocationOn className="text-emerald-500/60" size={14} />
                                <span>123 Culinary Street, Foodville</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-200 dark:border-white/[0.06] py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                        © {new Date().getFullYear()} FeastFinder. All rights reserved.
                    </span>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 text-xs transition-colors">Sitemap</a>
                        <span className="text-gray-300 dark:text-gray-700 text-xs">•</span>
                        <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 text-xs transition-colors">FAQ</a>
                        <span className="text-gray-300 dark:text-gray-700 text-xs">•</span>
                        <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 text-xs transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer