import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { Link } from 'react-router-dom';
import { FaSearch, FaRobot, FaGlobeAmericas, FaUtensils, FaHeart } from 'react-icons/fa';

const features = [
  {
    icon: <FaSearch className="w-6 h-6" />,
    title: 'Search by Ingredient',
    description: 'Type what you have in your fridge and discover recipes you can make right now.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    icon: <FaRobot className="w-6 h-6" />,
    title: 'AI SmartChef',
    description: 'Our AI generates personalized recipes tailored to your ingredients and taste preferences.',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
  },
  {
    icon: <FaGlobeAmericas className="w-6 h-6" />,
    title: 'Global Cuisines',
    description: 'Explore dishes from 50+ cuisines around the world — from Italian to Japanese and beyond.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
];

const steps = [
  {
    number: '01',
    title: 'Search & Discover',
    description: 'Browse thousands of recipes or search by ingredients you already have.',
    icon: <FaSearch className="w-5 h-5" />,
  },
  {
    number: '02',
    title: 'Cook & Create',
    description: 'Follow step-by-step instructions with video tutorials to create your meal.',
    icon: <FaUtensils className="w-5 h-5" />,
  },
  {
    number: '03',
    title: 'Save & Enjoy',
    description: 'Save your favorites, share with friends, and build your personal cookbook.',
    icon: <FaHeart className="w-5 h-5" />,
  },
];

// Simple scroll reveal hook
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll('.reveal');
      reveals.forEach(r => observer.observe(r));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

const Home = () => {
  const pageRef = useReveal();

  return (
    <main ref={pageRef} className="w-full flex flex-col">
      {/* Hero */}
      <Header
        title={
          <p>
            Taste the World with
            <br /> FeastFinder!
          </p>
        }
        type="home"
      />

      {/* Features Section */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[hsl(220,20%,6%)] overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100/40 dark:bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
          {/* Section heading */}
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">Why FeastFinder</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Cook Better</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              From recipe discovery to AI-powered meal creation, we've got you covered.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="reveal group relative p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-500 hover-glow"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle gradient accent at bottom */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-[hsl(220,18%,4%)]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
          {/* Section heading */}
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">How It Works</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Three Simple Steps to{' '}
              <span className="gradient-text">Deliciousness</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Getting from ingredients to a gourmet meal has never been easier.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="reveal relative text-center"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line (between cards on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-emerald-300 dark:from-emerald-500/30 to-transparent" />
                )}

                {/* Step number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] mb-6 mx-auto shadow-sm">
                  <span className="text-3xl font-extrabold gradient-text">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20 w-full">
        <Recipes />
      </section>

      {/* SmartChef CTA Banner */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-emerald-900/80 to-gray-900 dark:from-[hsl(220,18%,8%)] dark:via-emerald-900/30 dark:to-[hsl(220,18%,8%)] p-8 md:p-14 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            
            {/* Floating emojis in banner */}
            <span className="absolute top-6 right-8 text-4xl md:text-5xl opacity-30 animate-float select-none" aria-hidden="true">🤖</span>
            <span className="absolute bottom-6 right-24 text-3xl opacity-20 animate-float-reverse select-none" style={{animationDelay: '1s'}} aria-hidden="true">✨</span>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">AI Feature</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Let AI Cook{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    For You
                  </span>
                </h2>
                <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
                  Enter the ingredients you have, and our SmartChef AI will generate a complete, 
                  personalized recipe in seconds. No more wondering what to cook!
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="/smartchef"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-full shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
                >
                  <span>Try SmartChef</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;