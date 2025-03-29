"use client";

import React, { useState } from "react";
import {
    Zap,
    Clock,
    Bell,
    Users,
    Shield,
    Sparkles,
    HeartHandshake,
    MessagesSquare,
    Smartphone,
} from "lucide-react";

const FeaturesSection = () => {
    const [activeTab, setActiveTab] = useState<any>("instant");

    const features = {
        instant: {
            title: "Lightning Fast Updates",
            description:
                "Share your status in seconds, not minutes. Quick taps and intuitive gestures make staying in touch effortless.",
            icon: <Zap className="h-6 w-6" />,
            color: "bg-orange-500",
            demo: ["One tap to open", "Choose your status", "Instantly shared"],
        },
        notifications: {
            title: "Smart Notifications",
            description:
                "Notifications that respect your time. Get updates from your circle in perfect order, exactly when you want them.",
            icon: <Bell className="h-6 w-6" />,
            color: "bg-blue-500",
            demo: [
                "Linearized delivery",
                "Priority controls",
                "Custom quiet hours",
            ],
        },
        connections: {
            title: "Meaningful Connections",
            description:
                "Build your circle thoughtfully. Focus on the people who matter most, without the noise of a massive network.",
            icon: <HeartHandshake className="h-6 w-6" />,
            color: "bg-pink-500",
            demo: [
                "Curated circles",
                "Rich status options",
                "Direct interactions",
            ],
        },
    } as any;

    return (
        <div id="features" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-8">
                        <Sparkles className="h-4 w-4" />
                        Powerful Features
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Everything you need, <br />
                        {`nothing you don't`}
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        Keep your circle close without getting lost in endless
                        feeds and notifications. Simple, focused features that
                        help you stay connected.
                    </p>
                </div>

                {/* Feature Tabs */}
                <div className="mx-auto max-w-5xl">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {Object.entries(features).map(([key, feature]: any) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200
                                    ${
                                        activeTab === key
                                            ? `${feature.color} text-white shadow-lg scale-105`
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {feature.icon}
                                <span className="font-medium">
                                    {feature.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Feature Details */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                                <div
                                    className={`inline-flex ${features[activeTab].color} rounded-full p-3 text-white shadow-lg mb-6`}
                                >
                                    {features[activeTab].icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {features[activeTab].title}
                                </h3>
                                <p className="text-gray-600 mb-8 leading-7">
                                    {features[activeTab].description}
                                </p>
                                <div className="space-y-4">
                                    {features[activeTab].demo.map(
                                        (item: any, index: any) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`${features[activeTab].color} h-8 w-8 rounded-full flex items-center justify-center text-white font-medium`}
                                                >
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700 font-medium">
                                                    {item}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Demo */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                {/* Phone Frame */}
                                <div className="mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] p-4 shadow-xl">
                                    <div className="relative bg-white w-full h-full rounded-[2.5rem] overflow-hidden">
                                        {/* <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl" /> */}

                                        {/* Demo Content */}
                                        <div className="pt-8 px-4">
                                            <div className="flex items-center justify-between mb-6">
                                                <h4 className="font-semibold">
                                                    Your Circle
                                                </h4>
                                                <button className="bg-blue-100 p-2 rounded-full">
                                                    <Users className="h-4 w-4 text-blue-600" />
                                                </button>
                                            </div>

                                            {/* Status Cards */}
                                            {[1, 2, 3].map((item) => (
                                                <div
                                                    key={item}
                                                    className={`mb-3 p-4 rounded-xl shadow-sm transition-all duration-300
                                                        ${
                                                            activeTab ===
                                                            "instant"
                                                                ? "bg-orange-50"
                                                                : activeTab ===
                                                                  "notifications"
                                                                ? "bg-blue-50"
                                                                : "bg-pink-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                                                        <div className="h-3 w-24 bg-gray-200 rounded" />
                                                    </div>
                                                    <div className="h-2 w-32 bg-gray-200 rounded" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -z-10 inset-0 opacity-5">
                                    <div
                                        className={`absolute right-10 top-10 w-32 h-32 rounded-full ${features[activeTab].color}`}
                                    />
                                    <div
                                        className={`absolute left-10 bottom-10 w-40 h-40 rounded-full ${features[activeTab].color}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Benefits */}
                <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Clock,
                            title: "Time-Saving",
                            description:
                                "Update your status in seconds, not minutes. Quick actions that respect your schedule.",
                        },
                        {
                            icon: Shield,
                            title: "Privacy First",
                            description:
                                "Your data stays private. Share only what you want, with who you want.",
                        },
                        {
                            icon: Smartphone,
                            title: "Always Available",
                            description:
                                "Access your circle from any device. Stay connected wherever you are.",
                        },
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                                <benefit.icon className="h-6 w-6 text-blue-600" />
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

export default FeaturesSection;
