"use client";

import React from "react";
import {
    GraduationCap,
    Shield,
    Award,
    MessageSquare,
    EyeOff,
    Sparkles,
    Users,
    Zap,
    Heart,
    LineChart,
} from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: MessageSquare,
            color: "from-purple-600 to-purple-500",
            bgColor: "bg-purple-900/20",
            borderColor: "border-purple-700/30",
            title: "Express Yourself",
            description:
                "Share confessions, achievements, and insights in a supportive environment that values authentic expression.",
        },
        {
            icon: Users,
            color: "from-blue-600 to-blue-500",
            bgColor: "bg-blue-900/20",
            borderColor: "border-blue-700/30",
            title: "Community Focused",
            description:
                "Join diverse groups based on your interests, career goals, or personal growth aspirations.",
        },
        {
            icon: EyeOff,
            color: "from-amber-600 to-amber-500",
            bgColor: "bg-amber-900/20",
            borderColor: "border-amber-700/30",
            title: "Privacy Conscious",
            description:
                "Post anonymously when needed while maintaining your connection to the community. You control your identity.",
        },
        {
            icon: GraduationCap,
            color: "from-green-600 to-green-500",
            bgColor: "bg-green-900/20",
            borderColor: "border-green-700/30",
            title: "Growth Oriented",
            description:
                "Track your progress and celebrate milestones on your personal and professional development journey.",
        },
        {
            icon: Heart,
            color: "from-pink-600 to-pink-500",
            bgColor: "bg-pink-900/20",
            borderColor: "border-pink-700/30",
            title: "Supportive Environment",
            description:
                "Receive encouragement and feedback from community members who share your interests and goals.",
        },
        {
            icon: Award,
            color: "from-indigo-600 to-indigo-500",
            bgColor: "bg-indigo-900/20",
            borderColor: "border-indigo-700/30",
            title: "Achievement Driven",
            description:
                "Earn recognition and badges as you contribute to communities and achieve your personal milestones.",
        },
    ];

    return (
        <section
            id="features"
            className="relative py-24 bg-gradient-to-b from-[#22222a] to-[#1a1a20]"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[10%] top-[30%] h-[25rem] w-[25rem] bg-gradient-to-b from-purple-900/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute right-[10%] bottom-[20%] h-[20rem] w-[20rem] bg-gradient-to-b from-blue-900/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#33333d] text-blue-400 mb-6">
                        <Sparkles className="h-4 w-4" />
                        Platform Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                        Everything you need to connect and grow
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-300">
                        Our platform combines privacy, community, and personal
                        growth in one seamless experience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#2a2a30] to-[#222228] rounded-xl overflow-hidden shadow-lg hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div
                                className={`h-2 w-full bg-gradient-to-r ${feature.color}`}
                            ></div>
                            <div className="p-6">
                                <div
                                    className={`rounded-xl ${feature.bgColor} p-3 w-fit mb-5 border ${feature.borderColor}`}
                                >
                                    {React.createElement(feature.icon, {
                                        className: "h-6 w-6 text-white",
                                    })}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Benefits Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
                            Core Benefits
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-300">
                            Experience a platform designed with your needs in
                            mind
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: GraduationCap,
                                color: "text-blue-400",
                                bgColor: "bg-blue-900/30",
                                borderColor: "border-blue-700/30",
                                title: "Learning Focused",
                                description:
                                    "Every feature is designed to enhance your growth journey. No distractions, just authentic knowledge sharing.",
                            },
                            {
                                icon: Shield,
                                color: "text-purple-400",
                                bgColor: "bg-purple-900/30",
                                borderColor: "border-purple-700/30",
                                title: "Privacy Conscious",
                                description:
                                    "We only collect what's necessary. Share only with communities you choose to join, and stay anonymous when needed.",
                            },
                            {
                                icon: Award,
                                color: "text-amber-400",
                                bgColor: "bg-amber-900/30",
                                borderColor: "border-amber-700/30",
                                title: "Achievement Driven",
                                description:
                                    "Earn badges, track streaks, and build your personal portfolio as you contribute and grow within communities.",
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-[#2a2a30] rounded-xl p-6 border border-[#33333a] hover:bg-[#33333d] hover:border-[#44444a] transition-all duration-200"
                            >
                                <div
                                    className={`${benefit.bgColor} rounded-full p-3 w-fit mb-4 border ${benefit.borderColor}`}
                                >
                                    <benefit.icon
                                        className={`h-6 w-6 ${benefit.color}`}
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-400">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                {/* <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-0.5 shadow-lg">
                        <div className="bg-[#1a1a20] rounded-[10px] px-8 py-4">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Zap className="h-5 w-5 text-blue-400" />
                                <span className="text-white font-medium">
                                    Ready to get started?
                                </span>
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-200 shadow-md">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default FeaturesSection;
