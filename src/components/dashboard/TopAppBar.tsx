"use client";

import {
    Bell,
    LogOut,
    Menu,
    MessageSquare,
    Search,
    UserIcon,
} from "lucide-react";
import SignOutButton from "../SignOutButton";
import { useState } from "react";

export default function TopAppBar({
    user,
}: {
    user: {
        name: string;
        email: string;
        image?: string;
    };
}) {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="bg-gradient-to-r from-[#1f1f24] to-[#232328] shadow-lg border-b border-[#333339]/70 sticky top-0 z-10 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="md:hidden p-2 rounded-full text-gray-400 hover:bg-[#2a2a32] hover:text-gray-200 transition-all duration-200">
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-gray-700/40">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserIcon className="h-5 w-5 text-blue-400" />
                            )}
                        </div>
                        <div className="ml-3 hidden sm:block">
                            <div className="font-semibold text-sm text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {showSearch ? (
                        <div className="relative animate-fadeIn">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-[#2a2a32] border border-[#3a3a42] rounded-full px-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-40 md:w-64"
                                autoFocus
                                onBlur={() => setShowSearch(false)}
                            />
                            <button
                                onClick={() => setShowSearch(false)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowSearch(true)}
                            className="p-2 rounded-full text-gray-400 hover:bg-[#2a2a32] hover:text-gray-200 transition-all duration-200"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}

                    {/* <button className="p-2 rounded-full text-gray-400 hover:bg-[#2a2a32] hover:text-gray-200 transition-all duration-200 relative">
                        <MessageSquare className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
                    </button>

                    <button className="p-2 rounded-full text-gray-400 hover:bg-[#2a2a32] hover:text-gray-200 transition-all duration-200 relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button> */}

                    <div className="h-5 mx-2 border-l border-gray-700/70"></div>

                    <SignOutButton className="rounded-full p-2 text-gray-400 hover:bg-[#2a2a32] hover:text-gray-200 transition-all duration-200 flex items-center gap-2">
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:inline text-sm font-medium">
                            Sign out
                        </span>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
