"use client";
import React from "react";
import { Github, Twitter, Linkedin, Heart, Bell } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/mishodzuliashvili/beexample",
            icon: Github,
        },
        {
            name: "Linkedin",
            href: "https://www.linkedin.com/company/straight-forks",
            icon: Linkedin,
        },
    ];

    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center gap-8">
                    {/* Brand */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="bg-blue-500 rounded-full p-2">
                            <Bell className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            BeExample
                        </span>
                    </Link>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        {socialLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" />
                            </Link>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>
                            &copy; {new Date().getFullYear()} BeExample.
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>Made with</span>
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>by</span>
                        <span className="text-black font-semibold">
                            Straight Forks
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
