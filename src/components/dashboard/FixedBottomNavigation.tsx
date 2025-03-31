"use client";

import {
    BookOpen,
    MessageSquare,
    Plus,
    Sparkles,
    UserIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FixedBottomNavigation({
    initialActiveTab = "feed",
    onCreatePost,
}: {
    initialActiveTab?: string;
    onCreatePost?: () => void;
}) {
    const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

    const toggleCreatePost = () => {
        if (onCreatePost) {
            onCreatePost();
        }
    };

    return (
        <div
            className={`fixed z-50 bg-gradient-to-br from-[#2a2a30] to-[#222228] backdrop-blur-sm transition-all duration-300 shadow-lg left-0 right-0 bottom-0 sm:left-[50%] sm:translate-x-[-50%] sm:bottom-5 sm:rounded-full sm:right-auto`}
        >
            <div
                className={`flex py-3 px-4 items-center gap-3 justify-between sm:justify-normal`}
            >
                <Link href="/feed" passHref>
                    <button
                        onClick={() => setActiveTab("feed")}
                        className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-200
                            ${
                                activeTab === "feed"
                                    ? "text-blue-400 bg-blue-900/30 border border-blue-700/30"
                                    : "text-gray-300 hover:text-gray-200 border border-transparent hover:bg-[#33333d]"
                            }`}
                    >
                        <Sparkles className="h-5 w-5" />
                        {/* <span className="text-xs mt-1 font-medium">Feed</span> */}
                    </button>
                </Link>

                <Link href="/discover" passHref>
                    <button
                        onClick={() => setActiveTab("discover")}
                        className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-200
                            ${
                                activeTab === "discover"
                                    ? "text-blue-400 bg-blue-900/30 border border-blue-700/30"
                                    : "text-gray-300 hover:text-gray-200 border border-transparent hover:bg-[#33333d]"
                            }`}
                    >
                        <BookOpen className="h-5 w-5" />
                        {/* <span className="text-xs mt-1 font-medium">
                            Discover
                        </span> */}
                    </button>
                </Link>

                <button
                    onClick={toggleCreatePost}
                    className={`flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 h-12 w-12`}
                >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300">
                        <Plus className="h-6 w-6" />
                    </div>
                </button>

                <Link href="/groups" passHref>
                    <button
                        onClick={() => setActiveTab("groups")}
                        className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-200
                            ${
                                activeTab === "groups"
                                    ? "text-blue-400 bg-blue-900/30 border border-blue-700/30"
                                    : "text-gray-300 hover:text-gray-200 border border-transparent hover:bg-[#33333d]"
                            }`}
                    >
                        <MessageSquare className="h-5 w-5" />
                        {/* <span className="text-xs mt-1 font-medium">Groups</span> */}
                    </button>
                </Link>

                <Link href="/profile" passHref>
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-200
                            ${
                                activeTab === "profile"
                                    ? "text-blue-400 bg-blue-900/30 border border-blue-700/30"
                                    : "text-gray-300 hover:text-gray-200 border border-transparent hover:bg-[#33333d]"
                            }`}
                    >
                        <UserIcon className="h-5 w-5" />
                        {/* <span className="text-xs mt-1 font-medium">
                            Profile
                        </span> */}
                    </button>
                </Link>
            </div>
        </div>
    );
}
