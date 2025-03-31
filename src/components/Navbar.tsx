"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    MessageSquare,
    Users,
    LogIn,
    ChevronDown,
    EyeOff,
    Bell,
} from "lucide-react";
import SignInButton from "./SignInButton";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Check scroll position to change navbar style
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        { name: "Home", href: "/#top" },
        { name: "How It Works", href: "/#howitworks" },
        { name: "Features", href: "/#features" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[#1a1a20]/90 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and Name */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <div className="flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-white absolute" />
                                <EyeOff className="h-5 w-5 text-white opacity-60 translate-x-1 -translate-y-1" />
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            BeExample
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <SignInButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-2 px-5 rounded-lg shadow-md text-sm font-medium transition-all duration-200">
                            Sign In
                        </SignInButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1a20]/95 backdrop-blur-md shadow-lg border-t border-[#33333a] animate-fadeIn">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-3 px-3 text-gray-300 hover:bg-[#33333d] hover:text-white rounded-lg transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-[#33333a]">
                            <SignInButton className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 px-5 rounded-lg shadow-md font-medium">
                                <LogIn className="h-4 w-4 mr-2" />
                                Sign In
                            </SignInButton>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
