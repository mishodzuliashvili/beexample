"use client";

import React, { useState } from "react";
import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Brain,
    Users,
    Shield,
    Zap,
    Clock,
    MessageSquare,
    Smartphone,
    Award,
    LineChart,
} from "lucide-react";

const FeaturesSection = () => {
    const [activeTab, setActiveTab] = useState<any>("knowledge");

    const features = {
        knowledge: {
            title: "Knowledge Building",
            description:
                "Discover and share bite-sized educational content that's easy to digest. Build your knowledge repository one daily insight at a time.",
            icon: <Brain className="h-6 w-6" />,
            color: "bg-indigo-500",
            demo: ["Capture key insights", "Track learning streaks", "Build a knowledge portfolio"],
        },
        community: {
            title: "Learning Communities",
            description:
                "Join subject-based communities filled with passionate learners. Connect with peers studying the same topics and accelerate your learning together.",
            icon: <Users className="h-6 w-6" />,
            color: "bg-green-500",
            demo: [
                "Topic-specific groups",
                "Expert-led discussions",
                "Collaborative learning",
            ],
        },
        tracking: {
            title: "Learning Progress",
            description:
                "Track your educational journey with intuitive analytics. See your growth over time and identify areas for further exploration.",
            icon: <LineChart className="h-6 w-6" />,
            color: "bg-blue-500",
            demo: [
                "Visual learning paths",
                "Subject mastery tracking",
                "Knowledge gap analysis",
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
                        Learning Features
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Tools for your <br />
                        educational journey
                    </h2>
                    <p className="text-lg leading-8 text-gray-600">
                        BeExample provides everything you need to share your learning, discover new insights, and grow with a community of curious minds.
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
                                        {/* Demo Content */}
                                        <div className="pt-8 px-4">
                                            <div className="flex items-center justify-between mb-6">
                                                <h4 className="font-semibold">
                                                    {activeTab === "knowledge" ? "Today's Learning" :
                                                        activeTab === "community" ? "Your Communities" :
                                                            "Learning Progress"}
                                                </h4>
                                                <button className="bg-blue-100 p-2 rounded-full">
                                                    {activeTab === "knowledge" ?
                                                        <BookOpen className="h-4 w-4 text-blue-600" /> :
                                                        activeTab === "community" ?
                                                            <Users className="h-4 w-4 text-blue-600" /> :
                                                            <LineChart className="h-4 w-4 text-blue-600" />
                                                    }
                                                </button>
                                            </div>

                                            {/* Status Cards */}
                                            {activeTab === "knowledge" && (
                                                <>
                                                    <div className="mb-3 p-4 rounded-xl bg-indigo-50 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                <BookOpen className="h-5 w-5 text-indigo-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">Web Development</div>
                                                                <div className="text-xs text-gray-500">5 min ago</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-700">Learned how to implement authentication with JWT tokens for secure API access.</p>
                                                    </div>
                                                    <div className="mb-3 p-4 rounded-xl bg-indigo-50 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                <Brain className="h-5 w-5 text-indigo-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">Machine Learning</div>
                                                                <div className="text-xs text-gray-500">2 hrs ago</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-700">Discovered how decision trees split data to make predictions based on feature values.</p>
                                                    </div>
                                                </>
                                            )}

                                            {activeTab === "community" && (
                                                <>
                                                    <div className="mb-3 p-4 rounded-xl bg-green-50 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                <Users className="h-5 w-5 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">Data Science Hub</div>
                                                                <div className="text-xs text-gray-500">253 members</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-500">12 new posts today</span>
                                                            <button className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-600">View</button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 p-4 rounded-xl bg-green-50 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                <Users className="h-5 w-5 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">UX Designers</div>
                                                                <div className="text-xs text-gray-500">175 members</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-500">5 new posts today</span>
                                                            <button className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-600">View</button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {activeTab === "tracking" && (
                                                <div className="space-y-4">
                                                    <div className="p-4 rounded-xl bg-blue-50 shadow-sm">
                                                        <h5 className="font-medium mb-2">Learning Streak</h5>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                                                <div
                                                                    key={day}
                                                                    className={`h-8 w-8 rounded-md flex items-center justify-center ${day < 6 ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-400'}`}
                                                                >
                                                                    {day}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-2 text-xs text-gray-500">5 day streak! Keep going!</div>
                                                    </div>

                                                    <div className="p-4 rounded-xl bg-blue-50 shadow-sm">
                                                        <h5 className="font-medium mb-2">Subject Progress</h5>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span>Web Development</span>
                                                                    <span>78%</span>
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span>UX Design</span>
                                                                    <span>45%</span>
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span>Machine Learning</span>
                                                                    <span>23%</span>
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '23%'}}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
                            icon: GraduationCap,
                            title: "Learning Focused",
                            description:
                                "Every feature is designed to enhance your educational journey. No distractions, just pure knowledge sharing and acquisition.",
                        },
                        {
                            icon: Shield,
                            title: "Privacy Conscious",
                            description:
                                "We only collect what's necessary for your learning journey. Share only with communities you choose to join.",
                        },
                        {
                            icon: Award,
                            title: "Achievement Driven",
                            description:
                                "Earn badges, track streaks, and build your learning portfolio as you grow on your educational journey.",
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
