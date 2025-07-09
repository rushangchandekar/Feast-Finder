import React, { useState } from 'react';
import Logo from '../images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed z-10 bg-black opacity-90">
      <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center text-white text-lg cursor-pointer">
          <img src={Logo} alt="Logo" className="hidden md:block h-10 lg:h-14 w-auto" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-white gap-6">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#recipes">Explore</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>
          <li>
            <a href="/smartchef" className="hover:text-green-400 flex items-center gap-1">
              <span role="img" aria-label="robot">🤖</span> SmartChef
            </a>
          </li>
        </ul>

        {/* Sign-in Button */}
        <Button
          title="Sign in"
          conteinerStyle="hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]"
        />

        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden text-white text-xl"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${open ? 'flex' : 'hidden'} bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
        <a href="/">Home</a>
        <a href="/#recipes">Recipes</a>
        <a href="/favorites">Favorites</a>
        <Link to="/smartchef">🤖SmartChef</Link>
      </div>
    </header>
  );
};

export default Navbar;
