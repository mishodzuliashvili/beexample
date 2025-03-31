"use client";

import React from "react";
import {
    MessageSquare,
    EyeOff,
    Users,
    Sparkles,
    Shield,
    ArrowRight,
    Flame,
    Award,
    BookOpen,
    Lightbulb,
    Lock,
    UserIcon,
} from "lucide-react";
import Link from "next/link";
import SignInButton from "./SignInButton";

const BeautifulHero = () => {
    return (
        <div className="relative pt-10 pb-20 overflow-hidden">
            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md border border-blue-500/20 mb-8">
                            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                            <span className="text-xs font-medium text-blue-300">
                                Express Yourself Safely
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Where
                            </span>
                            <span className="relative">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                                    {" "}
                                    authenticity{" "}
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 5.5C95 -1.5 198 -1.5 299 5.5"
                                        stroke="url(#paint0_linear)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1="1"
                                            y1="5.5"
                                            x2="299"
                                            y2="5.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                stopColor="#60A5FA"
                                                stopOpacity="0"
                                            />
                                            <stop
                                                offset="0.5"
                                                stopColor="#60A5FA"
                                            />
                                            <stop
                                                offset="1"
                                                stopColor="#C084FC"
                                                stopOpacity="0"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                meets community
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300/90 mb-10 leading-relaxed max-w-xl">
                            Join diverse groups and express yourself
                            authentically – whether publicly or anonymously.
                            Share confessions, insights, and achievements in a
                            space designed for genuine connection.
                        </p>

                        <div className="flex flex-wrap items-center gap-5 mb-12">
                            <SignInButton className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200">
                                <span className="relative z-10">Join Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-200 group-hover:duration-300"></div>
                            </SignInButton>

                            <Link
                                href="#howitworks"
                                className="group text-base font-medium text-gray-300 flex items-center gap-2"
                            >
                                How It Works
                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex -space-x-3">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 rounded-full border-2 border-[#151520] overflow-hidden ring-2 ring-[#1a1a25] shadow-lg"
                                    >
                                        <div className="h-full w-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                                            <UserIcon className="h-4 w-4 text-gray-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gradient-to-r from-[#252535]/50 to-[#33334a]/50 backdrop-blur-md rounded-xl px-4 py-2 border border-white/5">
                                <div className="text-gray-300 text-sm">
                                    <span className="text-blue-400 font-semibold">
                                        2,500+
                                    </span>{" "}
                                    members sharing daily
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Glass card mockup */}
                    <div className="relative">
                        {/* Glowing lights under the card */}
                        <div className="absolute -inset-4 -z-10">
                            <div className="absolute left-1/4 top-1/2 h-40 w-40 rounded-full bg-blue-600/30 blur-[80px]" />
                            <div className="absolute right-1/3 bottom-1/4 h-40 w-40 rounded-full bg-purple-600/30 blur-[80px]" />
                        </div>

                        {/* Main card */}
                        <div className="bg-gradient-to-br from-[#252535]/80 to-[#1a1a25]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden p-1">
                            <div className="bg-gradient-to-br from-[#252535]/70 to-[#1a1a25]/90 rounded-xl p-6">
                                {/* Card header with user info */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center ring-2 ring-purple-600/20 shadow-lg">
                                                <EyeOff className="h-5 w-5 text-purple-400" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center ring-2 ring-[#1a1a25]">
                                                <Lock className="h-3 w-3 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-200">
                                                Anonymous
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs text-gray-400">
                                                    in
                                                </span>
                                                <span className="text-xs font-medium text-blue-400 ml-1">
                                                    Personal Growth
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-500/30">
                                            <MessageSquare className="h-4 w-4 text-purple-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Card content */}
                                <div className="mb-5">
                                    <div className="bg-[#1a1a25]/70 rounded-xl p-5 border border-white/5">
                                        <p className="text-gray-300 mb-3">
                                            {`I've been struggling with imposter
                                            syndrome at my new job, but today I
                                            realized that everyone starts
                                            somewhere. Rather than hiding my
                                            questions, I asked for help and
                                            learned so much more.`}
                                        </p>
                                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                            <span className="text-xs text-gray-400">
                                                Just now
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Shield className="h-3.5 w-3.5 text-green-400" />
                                                <span className="text-xs text-green-400">
                                                    Protected
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Post types */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        {
                                            name: "Confessions",
                                            icon: MessageSquare,
                                            color: "from-purple-500/90 to-purple-600/90",
                                            border: "border-purple-500/30",
                                            text: "",
                                        },
                                        {
                                            name: "Insights",
                                            icon: Lightbulb,
                                            color: "from-amber-500/90 to-amber-600/90",
                                            border: "border-amber-500/30",
                                            text: "",
                                        },
                                        {
                                            name: "Achievements",
                                            icon: Award,
                                            color: "from-green-500/90 to-green-600/90",
                                            border: "border-green-500/30",
                                            text: "",
                                        },
                                    ].map((type) => (
                                        <div
                                            key={type.name}
                                            className={`flex flex-col items-center justify-center py-3 rounded-xl bg-gradient-to-b ${type.color} border ${type.border} shadow-lg`}
                                        >
                                            {React.createElement(type.icon, {
                                                className: `h-5 w-5 ${type.text} mb-1`,
                                            })}
                                            <span
                                                className={`text-xs font-medium ${type.text}`}
                                            >
                                                {type.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-[#252535]/50 to-[#33334a]/50 border border-white/5">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/30">
                                            <Users className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-200">
                                                Join Groups
                                            </h3>
                                            <p className="text-xs text-gray-400">
                                                Connect with peers
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-[#252535]/50 to-[#33334a]/50 border border-white/5">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-500/30">
                                            <EyeOff className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-200">
                                                Stay Anonymous
                                            </h3>
                                            <p className="text-xs text-gray-400">
                                                When needed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating elements */}
                        <div className="absolute -top-6 -right-6 h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transform rotate-12 animate-float">
                            <div className="h-full w-full flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform -rotate-12 animate-float animation-delay-1000">
                            <div className="h-full w-full flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add these to your globals.css file
/* 
@keyframes float {
  0% {
    transform: translateY(0px) rotate(12deg);
  }
  50% {
    transform: translateY(-10px) rotate(10deg);
  }
  100% {
    transform: translateY(0px) rotate(12deg);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
*/

export default BeautifulHero;
