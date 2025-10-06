import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import Button from "./Button"

const Footer = () => {
    return (
        <footer className="text-white pt-16 pb-0 relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-green-700 to-green-900 opacity-95"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-green-400 to-yellow-300"></div>
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-yellow-400/20 -mt-8 -mr-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-green-400/10 -ml-12"></div>
            <div className="container mx-auto px-4 md:px-10 lg:px-20 py-10 relative">
                {/* Top Section with Logo and Contact Info */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/20 pb-8">
                    <div className="flex items-center mb-6 md:mb-0">
                        <div className="relative h-24 flex items-center">
                            <img 
                                src="/logo1.png" 
                                alt="FeastFinder Logo" 
                                className="h-full w-auto object-contain transform translate-y-[-10%] translate-x-[13%]" 
                            />
                        </div>
                        <span className="font-bold text-3xl text-center">
                            Feast<span className="text-yellow-400">Finder</span> 
                        </span>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <MdLocationOn className="text-yellow-400 mr-2" size={20} />
                            <p>123 Culinary Street, Foodville, IN 56789</p>
                        </div>
                        <div className="flex items-center">
                            <MdPhone className="text-yellow-400 mr-2" size={20} />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center">
                            <MdEmail className="text-yellow-400 mr-2" size={20} />
                            <p>info@feastfinder.com</p>
                        </div>
                    </div>
                </div>
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    <div>
                        <p className="font-bold text-lg mb-4 text-white border-b border-yellow-400/50 pb-2 inline-block">
                            About Us
                        </p>
                        <p className="text-white/80 mb-4 leading-relaxed">
                            FeastFinder is your ultimate culinary companion, connecting food enthusiasts with delicious recipes and smart cooking solutions.
                        </p>
                        <div className="flex space-x-3 mt-4">
                            <a
                                href='#'
                                className='bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-all'
                            >
                                <FaFacebook size={18} />
                            </a>

                            <a
                                href='#'
                                className='bg-pink-600 p-2 rounded-full text-white hover:bg-pink-700 transition-all'
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href='#'
                                className='bg-blue-400 p-2 rounded-full text-white hover:bg-blue-500 transition-all'
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href='#'
                                className='bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-all'
                            >
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-bold text-lg mb-4 text-white border-b border-yellow-400/50 pb-2 inline-block">
                            Quick Links
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Home
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                About
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Services
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Contact
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Chefs
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-bold text-lg mb-4 text-white border-b border-yellow-400/50 pb-2 inline-block">
                            Legal
                        </p>
                        <div className='grid grid-cols-1 gap-2'>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Terms and Conditions
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                License Agreement
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='flex items-center text-white/80 hover:text-yellow-400 transition-colors'
                            >
                                <span className="text-yellow-400 mr-2">›</span>
                                Copyright Information
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-bold text-lg mb-4 text-white border-b border-yellow-400/50 pb-2 inline-block">
                            Newsletter
                        </p>
                        <p className="text-white/80 mb-4">
                            Subscribe to our newsletter for the latest recipes and cooking tips.
                        </p>
                        <div className="mt-4 mb-6 flex">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="px-4 py-2 bg-white/10 border border-white/30 text-white rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button className="bg-yellow-400 text-green-900 font-semibold px-4 rounded-r-md hover:bg-yellow-300 transition-colors">
                                Send
                            </button>
                        </div>
                        
                        <Button
                            title='Join Community'
                            btnType='button'
                            conteinerStyle='bg-transparent border border-yellow-400 text-white hover:bg-yellow-400 hover:text-green-900 rounded-md py-2 px-4 transition-colors w-full'
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-6">
                    <span className="text-white/60 mb-2 md:mb-0">
                        © {new Date().getFullYear()} FeastFinder. All rights reserved.
                    </span>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Sitemap</a>
                        <span className="text-white/30">|</span>
                        <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">FAQ</a>
                        <span className="text-white/30">|</span>
                        <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer