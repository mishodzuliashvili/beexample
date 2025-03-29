"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, LayoutDashboard } from "lucide-react";
import Image from "next/image";

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
};

const AdminNav = ({ user }: { user: User }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Groups",
            href: "/admin/groups",
            icon: Users,
        },
    ];

    const isActive = (path: string) => {
        if (path === "/admin" && pathname === "/admin") {
            return true;
        }
        if (path !== "/admin" && pathname.startsWith(path)) {
            return true;
        }
        return false;
    };

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold text-xl">
                                BeExample
                            </span>
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                Admin
                            </span>
                        </Link>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive(item.href)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <item.icon className="h-4 w-4 mr-2" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User profile */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">{user.name}</span>
                            </div>
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden ml-2 p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="space-y-1 px-4 py-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive(item.href)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.icon className="h-4 w-4 mr-2" />
                                {item.label}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-3 pb-1 px-3">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default AdminNav;
