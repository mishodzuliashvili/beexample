"use client";
import React from "react";
import {
    Github,
    Heart,
    Coffee,
    Users,
    Sparkles,
    HandHeart,
    MessageCircleHeart,
    Code2,
} from "lucide-react";
import Link from "next/link";

const SupportSection = () => {
    return (
        <div id="support" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-pink-50 text-pink-600 mb-8">
                        <Heart className="h-4 w-4" />
                        Support the Project
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Join our community, <br />
                        make a difference
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        This project is free and open source, powered by the
                        community. Your contributions and support help keep it
                        alive and growing.
                    </p>
                </div>

                {/* Support Options */}
                <div className="mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-1 gap-8">
                        {/* Open Source */}
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                            <div className="inline-flex bg-purple-500 rounded-full p-3 text-white shadow-lg mb-6">
                                <Github className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Open Source
                            </h3>
                            <p className="text-gray-600 mb-8 leading-7">
                                Our codebase is open for everyone. Contribute
                                features, fix bugs, or improve documentation.
                                Every contribution makes a difference.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Submit pull requests",
                                    "Report issues",
                                    "Review code",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="bg-purple-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-medium">
                                            <Code2 className="h-4 w-4" />
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                target="_blank"
                                href="https://github.com/mishodzuliashvili/beexample"
                                className="mt-8 inline-flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors duration-200"
                            >
                                <Github className="h-5 w-5" />
                                View on GitHub
                            </Link>
                        </div>

                        {/* Donations */}
                        {/* <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                            <div className="inline-flex bg-pink-500 rounded-full p-3 text-white shadow-lg mb-6">
                                <HandHeart className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Support Us
                            </h3>
                            <p className="text-gray-600 mb-8 leading-7">
                                Your donations help maintain the project and
                                support ongoing development. Every contribution,
                                big or small, makes an impact.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Maintain servers",
                                    "Fund development",
                                    "Support community",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="bg-pink-500 h-8 w-8 rounded-full flex items-center justify-center text-white font-medium">
                                            <Coffee className="h-4 w-4" />
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-200">
                                <HandHeart className="h-5 w-5" />
                                Make a Donation
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Community Benefits */}
                <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Users,
                            title: "Join the Community",
                            description:
                                "Be part of a growing community of developers and users who shape the future of this project.",
                        },
                        {
                            icon: MessageCircleHeart,
                            title: "Direct Support",
                            description:
                                "Get help directly from maintainers and community members who care about the project.",
                        },
                        {
                            icon: Sparkles,
                            title: "Recognition",
                            description:
                                "All contributors are acknowledged and celebrated. Your impact will be visible to everyone.",
                        },
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <div className="bg-pink-100 rounded-full p-3 w-fit mb-4">
                                <benefit.icon className="h-6 w-6 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportSection;
