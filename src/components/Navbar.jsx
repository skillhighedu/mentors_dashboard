import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, CloseIcon, HomeIcon, ProfileIcon, NoteIcon } from "../assets/icons/icons";
import Logo from "../assets/logo.png";
import AuthContext from "../store/AuthContext"; 
import {MessageCircleQuestion} from 'lucide-react'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); // Get current route

  if (!isAuthenticated) return null;

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-10">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900">
            <img src={Logo} className="h-auto w-[150px] sm:w-[180px]" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLinks activePath={location.pathname} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white  border-t  border-gray-100 p-4  ">
          <NavLinks activePath={location.pathname} isMobile onClose={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
}

const NavLinks = ({ activePath, isMobile, onClose }) => {
  const links = [
    { name: "Home", path: "/", icon: <HomeIcon size={20} /> },
    { name: "Questions", path: "/questions", icon: <MessageCircleQuestion size={20} /> },
    { name: "Instructions", path: "/instructions", icon: <NoteIcon size={20} /> },
    { name: "Profile", path: "/profile", icon: <ProfileIcon size={20} /> },
  ];

  return (
    <ul className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-6"}`}>
      {links.map((link) => {
        const isActive = activePath === link.path;
        
        return (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`flex items-center space-x-2  font-medium transition 
                ${isActive ? "text-primary font-semibold" : "text-gray-800 hover:text-primary"}`}
              onClick={onClose}
            >
              {link.icon} <span>{link.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
