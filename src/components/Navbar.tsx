"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Bell,
    X,
    Menu,
    User,
    ChevronDown,
    LogOut,
    Settings,
    LifeBuoy, Users,
} from "lucide-react";
import SignInButton from "./SignInButton";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { user } = useAuth();
    // Handle scrolling behavior for fixed navbar
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById("navbar");
            // if (navbar) {
            //     if (window.scrollY > 20) {
            //         navbar.classList.add(
            //             "shadow-md",
            //             "bg-white/95",
            //             "backdrop-blur-sm"
            //         );
            //     } else {
            //         navbar.classList.remove(
            //             "shadow-md",
            //             "bg-white/95",
            //             "backdrop-blur-sm"
            //         );
            //     }
            // }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle click outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            id="navbar"
            className="fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white"
        >
            <nav
                className="flex items-center justify-between px-4 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8"
                aria-label="Global"
            >
                {/* Logo & Brand */}
                <div className="flex items-center flex-1">
                    <Link
                        href={user ? "/dashboard" : "/"}
                        className="flex items-center gap-2"
                    >
                        <Bell className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">
                            BeExample
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {!user && (
                    <div className="hidden lg:flex lg:gap-x-8">
                        <Link
                            href="/#howitworks"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="/#features"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                        >
                            Features
                        </Link>

                        <Link
                            href="/#support"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                        >
                            Support
                        </Link>
                    </div>
                )}

                <div className="flex items-center justify-end flex-1 gap-x-4">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setProfileDropdownOpen(!profileDropdownOpen)
                                }
                                className="flex items-center gap-2 p-1 transition-colors rounded-full hover:bg-gray-100"
                                aria-expanded={profileDropdownOpen}
                            >
                                <div className="relative w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                                    <Image
                                        src={user.image}
                                        alt="Profile"
                                        className="object-cover"
                                        fill
                                        sizes="32px"
                                    />
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            {/* Profile Dropdown */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href="/edit-profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </Link>
                                        {user.role === "ADMIN" && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setProfileDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <LifeBuoy className="w-4 h-4 mr-2" />
                                                Admin
                                            </Link>
                                        )}
                                        <Link
                                            href="/groups"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(
                                                    false
                                                )
                                            }
                                        >
                                            <Users className="w-4 h-4 mr-2"/>
                                            Groups
                                        </Link>
                                        <div className="border-t border-gray-100">
                                            <SignOutButton className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Sign out
                                            </SignOutButton>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <SignInButton className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Sign in
                        </SignInButton>
                    )}

                    {/* Mobile menu button */}
                    {!user && (
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 bg-black/25"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Mobile menu container */}
                    <div className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link
                                href={user ? "/dashboard" : "/"}
                                className="flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Bell className="w-8 h-8 text-blue-600" />
                                <span className="text-xl font-bold text-gray-900">
                                    BeExample
                                </span>
                            </Link>
                            <button
                                type="button"
                                className="p-2.5 text-gray-700 rounded-md hover:bg-gray-100"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flow-root mt-6">
                            <div className="divide-y divide-gray-100">
                                <div className="py-6 space-y-2">
                                    {user && (
                                        <div className="flex items-center gap-4 px-3 py-3 mb-4 border rounded-lg border-gray-200">
                                            <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                                                <Image
                                                    src={user.image}
                                                    alt="Profile"
                                                    className="object-cover"
                                                    fill
                                                    sizes="40px"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {!user && (
                                        <>
                                            <Link
                                                href="/#howitworks"
                                                className="block px-3 py-2 -mx-3 text-base font-medium leading-7 text-gray-900 rounded-md hover:bg-gray-50"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                How it Works
                                            </Link>
                                            <Link
                                                href="/#features"
                                                className="block px-3 py-2 -mx-3 text-base font-medium leading-7 text-gray-900 rounded-md hover:bg-gray-50"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                Features
                                            </Link>
                                            <Link
                                                href="/#support"
                                                className="block px-3 py-2 -mx-3 text-base font-medium leading-7 text-gray-900 rounded-md hover:bg-gray-50"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                Support
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="py-6">
                                    {user ? (
                                        <div className="space-y-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-3 py-2 -mx-3 text-base font-medium leading-7 text-gray-900 rounded-md hover:bg-gray-50"
                                            >
                                                <User className="w-5 h-5 mr-3" />
                                                Your Profile
                                            </Link>
                                            <Link
                                                href="/edit-profile"
                                                className="flex items-center px-3 py-2 -mx-3 text-base font-medium leading-7 text-gray-900 rounded-md hover:bg-gray-50"
                                            >
                                                <Settings className="w-5 h-5 mr-3" />
                                                Settings
                                            </Link>
                                            {user.role === "ADMIN" && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setProfileDropdownOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <LifeBuoy className="w-4 h-4 mr-2" />
                                                    Admin
                                                </Link>
                                            )}
                                            <SignOutButton className="flex items-center w-full px-4 py-2 mt-4 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                                <LogOut className="w-5 h-5 mr-2" />
                                                Sign out
                                            </SignOutButton>
                                        </div>
                                    ) : (
                                        <SignInButton className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                            Sign in
                                        </SignInButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
