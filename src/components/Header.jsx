import React, { useState, useEffect } from 'react';
import Banner1 from '../images/banner1.jpeg';
import Banner2 from '../images/banner2.jpeg';
import Banner3 from '../images/banner3.jpeg';
import Banner4 from '../images/banner4.webp';
import Banner5 from '../images/banner5.webp';
import { Link } from 'react-router-dom';

const images = [Banner1, Banner2, Banner3, Banner4, Banner5];

const floatingEmojis = [
  { emoji: '🍕', top: '15%', left: '8%', delay: '0s', size: 'text-3xl md:text-5xl' },
  { emoji: '🥑', top: '25%', right: '10%', delay: '1s', size: 'text-2xl md:text-4xl' },
  { emoji: '🍜', bottom: '30%', left: '5%', delay: '2s', size: 'text-3xl md:text-4xl' },
  { emoji: '🧁', top: '60%', right: '7%', delay: '0.5s', size: 'text-2xl md:text-3xl' },
  { emoji: '🍳', bottom: '15%', left: '15%', delay: '1.5s', size: 'text-2xl md:text-4xl' },
  { emoji: '🌶️', top: '10%', right: '25%', delay: '3s', size: 'text-xl md:text-3xl' },
];

const stats = [
  { value: '10K+', label: 'Recipes' },
  { value: '50+', label: 'Cuisines' },
  { value: 'AI', label: 'Powered' },
];

const Header = ({ title, image, type }) => {
  const [heroImage] = useState(() => image ?? images[Math.floor(Math.random() * images.length)]);

  // Only show the fancy hero on the home page (type === 'home')
  if (!type) {
    // RecipeDetail page: keep existing simple hero
    return (
      <div className="w-full h-[60vh] md:h-[70vh] relative">
        <div className="relative w-full h-full">
          <img
            src={image ?? images[Math.floor(Math.random() * images.length)]}
            alt="Recipe"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent top-0 z-[5] flex flex-col items-center justify-center pt-20 px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg">{title}</h1>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 dark:from-[hsl(220,20%,4%)] dark:via-[hsl(220,18%,8%)] dark:to-[hsl(160,30%,8%)]" />
        
        {/* Hero image with overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-15">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Decorative gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating food emojis */}
      <div className="absolute inset-0 z-[1] hidden md:block pointer-events-none">
        {floatingEmojis.map((item, index) => (
          <span
            key={index}
            className={`absolute ${item.size} animate-float select-none opacity-60`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animationDelay: item.delay,
              animationDuration: `${6 + index * 0.5}s`,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs md:text-sm font-medium tracking-wide uppercase">
              AI-Powered Recipe Discovery
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 animate-fadeInUp delay-100">
            <span className="text-white">Taste the World</span>
            <br />
            <span className="text-white">with </span>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              FeastFinder
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-white/60 max-w-xl mb-10 leading-relaxed animate-fadeInUp delay-200">
            Discover recipes from 50+ global cuisines, or let our AI SmartChef 
            create something magical from the ingredients in your fridge.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fadeInUp delay-300">
            <a
              href="#recipes"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
            >
              <span>Explore Recipes</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              to="/smartchef"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300"
            >
              <span>🤖</span>
              <span>Try SmartChef AI</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-12 animate-fadeInUp delay-500">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/50 text-xs md:text-sm font-medium tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-gentle">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Header;