"use client";

import React from "react";
import {
    GraduationCap,
    BookOpen,
    Sparkles,
    Users,
    Lightbulb,
    BookMarked,
    Share2,
} from "lucide-react";

const HowItWorksSection = () => {
    const features = [
        {
            icon: BookOpen,
            title: "Daily Learning Insights",
            description:
                "Share one educational insight each day. Whether it's a new concept you learned, a book excerpt, or a fascinating fact, your daily BeExample contributes to collective growth.",
            color: "bg-blue-500",
        },
        {
            icon: Users,
            title: "Join Learning Communities",
            description:
                "Connect with like-minded learners in topic-specific communities. Discover insights from others studying the same subjects and expand your knowledge network.",
            color: "bg-purple-500",
        },
        {
            icon: Share2,
            title: "Inspire & Get Inspired",
            description:
                "Engage with others' educational posts through reactions and comments. Every insight you share serves as motivation for others, making you the example - BeExample!",
            color: "bg-green-500",
        },
    ];

    return (
        <div id="howitworks" className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-8">
                        <Sparkles className="h-4 w-4" />
                        Knowledge Sharing Made Simple
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        How BeExample Works
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        Transform your learning journey through daily sharing and community engagement.
                        No information overload—just meaningful, bite-sized educational exchanges.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                        >
                            <div
                                className={`absolute -top-4 left-6 ${feature.color} rounded-full p-3 text-white shadow-lg`}
                            >
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="pt-4">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-7">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Journey */}
                <div className="mt-24">
                    <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12">
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold bg-blue-50 text-blue-600 mb-6">
                                    <GraduationCap className="h-4 w-4" />
                                    Your Learning Journey
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    One insight a day, endless growth together
                                </h3>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            icon: BookMarked,
                                            title: "Learn Something New",
                                            description: "Discover a concept, read an article, or master a skill",
                                            color: "text-blue-600",
                                            bgColor: "bg-blue-100",
                                        },
                                        {
                                            icon: Lightbulb,
                                            title: "Share Your Insight",
                                            description: "Post one educational update daily to your communities",
                                            color: "text-amber-600",
                                            bgColor: "bg-amber-100",
                                        },
                                        {
                                            icon: Users,
                                            title: "Engage & Grow Together",
                                            description: "React to others' insights and build your knowledge collectively",
                                            color: "text-green-600",
                                            bgColor: "bg-green-100",
                                        },
                                    ].map((step, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className={`${step.bgColor} p-3 rounded-full mt-1`}>
                                                <step.icon className={`h-5 w-5 ${step.color}`} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">
                                                    {step.title}
                                                </h4>
                                                <p className="text-gray-600 mt-1">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 text-white flex items-center justify-center">
                                <div className="max-w-sm mx-auto text-center">
                                    <div className="mb-6 mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        Become the Example
                                    </h3>
                                    <p className="text-white text-opacity-90 mb-6 leading-relaxed">
                                        Every insight you share inspires others. Your learning journey becomes the motivation for your community. That&apos;s the power of BeExample.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {["Knowledge", "Growth", "Community", "Inspiration", "Discovery"].map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
