"use client";

import React from "react";
import {
    Github,
    Twitter,
    Linkedin,
    Heart,
    MessageSquare,
    EyeOff,
    ExternalLink,
    Mail,
    Shield,
    BookOpen,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

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
        {
            name: "Twitter",
            href: "#",
            icon: Twitter,
        },
        {
            name: "Email",
            href: "mailto:contact@confido.com",
            icon: Mail,
        },
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "/#features" },
                { name: "How It Works", href: "/#howitworks" },
                // { name: "Pricing", href: "/pricing" },
                // { name: "FAQ", href: "/faq" },
            ],
        },
        // {
        //     title: "Community",
        //     links: [
        //         { name: "Groups", href: "/groups" },
        //         { name: "Testimonials", href: "/testimonials" },
        //         { name: "User Stories", href: "/stories" },
        //         { name: "Blog", href: "/blog" },
        //     ],
        // },
        {
            title: "Company",
            links: [
                // { name: "About Us", href: "/about" },
                // { name: "Careers", href: "/careers" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
            ],
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-[#1a1a20] to-[#15151a] border-t border-[#33333a]/50">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand and Description */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
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

                        <p className="text-gray-400 mb-6 max-w-md">
                            Join our community platform where you can share
                            thoughts, experiences, and insights anonymously or
                            publicly. Connect with like-minded individuals in a
                            safe, supportive environment.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-5">
                            {socialLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-gray-200 font-medium mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-[#33333a]/30 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>&copy; {currentYear} BeExample.</span>
                            <span className="text-gray-700">•</span>
                            <span>Made with</span>
                            <Heart className="h-3 w-3 text-pink-500" />
                            <span>by</span>
                            <span className="text-blue-400 font-medium">
                                Straight Forks
                            </span>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Shield className="h-3.5 w-3.5 text-green-400" />
                                <span>Privacy Protected</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                                <span>Open Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
