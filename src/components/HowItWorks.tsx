"use client";

import React from "react";
import {
    Users,
    MessageSquare,
    EyeOff,
    UserPlus,
    Heart,
    Lightbulb,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";

const HowItWorksSection = () => {
    const steps = [
        {
            id: 1,
            title: "Join Groups",
            description:
                "Discover and join communities that match your interests",
            icon: UserPlus,
            color: "from-blue-600 to-blue-500",
        },
        {
            id: 2,
            title: "Post Content",
            description:
                "Share thoughts anonymously or publicly within your groups",
            icon: MessageSquare,
            color: "from-purple-600 to-purple-500",
        },
        {
            id: 3,
            title: "Stay Anonymous",
            description:
                "Choose to hide your identity when sharing sensitive content",
            icon: EyeOff,
            color: "from-amber-600 to-amber-500",
        },
        {
            id: 4,
            title: "Connect",
            description:
                "Engage with others through comments, likes, and discussions",
            icon: Heart,
            color: "from-pink-600 to-pink-500",
        },
    ];

    return (
        <section
            id="howitworks"
            className="relative py-16 bg-gradient-to-b from-[#1a1a20] to-[#22222a]"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute right-[30%] top-[20%] h-[20rem] w-[20rem] bg-gradient-to-b from-blue-900/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                        How It Works
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-300">
                        Our platform makes it easy to connect with communities
                        and share experiences
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-gradient-to-br from-[#2a2a30] to-[#222228] rounded-xl p-6 border border-[#33333a] shadow-lg hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div
                                className={`h-14 w-14 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-5 shadow-lg`}
                            >
                                {React.createElement(step.icon, {
                                    className: "h-7 w-7 text-white",
                                })}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-400">{step.description}</p>

                            {/* <div className="pt-2 border-t border-[#33333d]">
                                <span className="inline-flex items-center text-sm text-blue-400 font-medium">
                                    Learn more
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </span>
                            </div> */}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#33333d] text-gray-300 border border-[#44444a]/30 shadow-md">
                        <Lightbulb className="h-5 w-5 text-amber-400 mr-2" />
                        <span className="text-sm">
                            Join{" "}
                            <span className="text-white font-medium">
                                thousands of users
                            </span>{" "}
                            already sharing in our communities
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
