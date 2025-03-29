"use client";

import React from "react";
import {
    Users,
    Bell,
    Sparkles,
    Clock,
    UserPlus,
    ListTodo,
    MessageSquare,
} from "lucide-react";

const HowItWorksSection = () => {
    const features = [
        {
            icon: UserPlus,
            title: "Follow Your Circle",
            description:
                "Connect with friends and family instantly. They'll receive notifications in the order they were followed, ensuring no one misses your connection request.",
            color: "bg-blue-500",
        },
        {
            icon: ListTodo,
            title: "Manage Your Network",
            description:
                "View all your connections in an organized list. Easily keep track of who's in your circle and manage your relationships in one place.",
            color: "bg-pink-500",
        },
        {
            icon: MessageSquare,
            title: "Quick Status Updates",
            description:
                "Open the status drawer with a single click. Choose from expressive status options to let your circle know how you're doing, all without breaking your flow.",
            color: "bg-amber-500",
        },
    ];

    return (
        <div id="howitworks" className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-8">
                        <Sparkles className="h-4 w-4" />
                        Simple & Intuitive
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        How BeExample Works
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        Stay connected with your circle through quick,
                        meaningful updates. No endless scrolling, no information
                        overload.
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
            </div>
        </div>
    );
};

export default HowItWorksSection;
