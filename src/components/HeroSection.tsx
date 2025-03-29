"use client";
import React, { useState } from "react";
import {
    Bell,
    X,
    Menu,
    BookOpen,
    Heart,
    Lightbulb,
    PenTool,
    Sparkles,
    GraduationCap,
    BookMarked,
} from "lucide-react";
import Link from "next/link";
import SignInButton from "./SignInButton";

const BeExampleLanding = () => {
    const [selectedStatus, setSelectedStatus] = useState<any>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const statuses = [
        {
            id: 1,
            icon: BookOpen,
            label: "Learned something new!",
            color: "bg-blue-500",
            position: "left-[10%] top-[28%] rotate-3",
            message: "Amazing! Your insight will inspire others in your circle!",
        },
        {
            id: 2,
            icon: Lightbulb,
            label: "Had an insight",
            color: "bg-amber-500",
            position: "left-[57%] top-[20%] -rotate-6",
            message: "Brilliant! Share your eureka moment with your community!",
        },
        {
            id: 3,
            icon: PenTool,
            label: "Created something",
            color: "bg-indigo-500",
            position: "left-[20%] top-[54%] rotate-6",
            message: "Wonderful! Your creation will motivate others to build too!",
        },
        {
            id: 4,
            icon: BookMarked,
            label: "Finished a course",
            color: "bg-green-500",
            position: "left-[56%] top-[40%] -rotate-3",
            message: "Congratulations! Your achievement is an example to follow!",
        },
        {
            id: 5,
            icon: GraduationCap,
            label: "Mastered a skill",
            color: "bg-purple-500",
            position: "left-[45%] top-[74%] -rotate-2",
            message: "Impressive! Your journey will inspire others to learn!",
        },
    ];

    const handleStatusClick = (status: any) => {
        setSelectedStatus(status);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    return (
        <div className="relative mx-auto max-w-7xl pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Text content */}
                <div className="text-left">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-8">
                        <GraduationCap className="h-4 w-4" />
                        Learn. Share. Inspire.
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
                        Daily learning with <span className="text-blue-600">your community</span>
                    </h1>

                    <p className="text-xl leading-8 text-gray-600 mb-10">
                        BeExample turns learning into a social experience. Share one educational insight daily, explore what others are learning, and grow together with like-minded learners in your community.
                    </p>

                    <div className="flex items-center gap-x-6">
                        <SignInButton className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-all duration-200 hover:scale-105">
                            Become Example
                        </SignInButton>
                        <Link
                            href="#howitworks"
                            className="group text-base font-semibold text-gray-900 flex items-center gap-2"
                        >
                            How It Works
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Right side - Interactive Learning Status Selector */}
                <div className="">
                    <div className="hidden md:block relative h-[400px] mb-8 ">
                        {/* Decorative background circles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {statuses.map((status, index) => (
                                <div
                                    key={`circle-${status.id}`}
                                    className={`absolute w-32 h-32 rounded-full opacity-5 ${status.color}`}
                                    style={{
                                        left: `${(index * 25) % 80}%`,
                                        top: `${(index * 30) % 70}%`,
                                        transform: `scale(${1 + index * 0.2})`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Status buttons */}
                        {statuses.map((status) => (
                            <button
                                key={status.id}
                                onClick={() => handleStatusClick(status)}
                                className={`absolute ${status.position}
                                    flex items-center justify-center gap-3 px-6 py-4 rounded-xl 
                                    transition-all duration-300 hover:scale-110 hover:rotate-0
                                    ${
                                    selectedStatus?.id === status.id
                                        ? `${status.color} text-white shadow-lg scale-110 z-10`
                                        : "bg-white hover:bg-gray-50 text-gray-700 shadow-md"
                                }`}
                            >
                                <status.icon
                                    className={`h-6 w-6 ${
                                        selectedStatus?.id === status.id
                                            ? "animate-bounce"
                                            : ""
                                    }`}
                                />
                                <span className="font-medium whitespace-nowrap">
                                    {status.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="block md:hidden mb-8">
                        {statuses.map((status) => (
                            <button
                                key={status.id}
                                onClick={() => handleStatusClick(status)}
                                className={` 
                                    flex items-center justify-center gap-3 px-6 py-4 rounded-xl 
                                    transition-all duration-300 w-full mb-2
                                    ${
                                    selectedStatus?.id === status.id
                                        ? `${status.color} text-white shadow-lg scale-105 z-10`
                                        : "bg-white hover:bg-gray-50 text-gray-700 shadow-md"
                                }`}
                            >
                                <status.icon
                                    className={`h-6 w-6 ${
                                        selectedStatus?.id === status.id
                                            ? "animate-bounce"
                                            : ""
                                    }`}
                                />
                                <span className="font-medium whitespace-nowrap">
                                    {status.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="h-[80px] relative">
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                isAnimating ? "scale-110" : "scale-100"
                            }`}
                        >
                            {selectedStatus ? (
                                <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl shadow-md bg-blue-100 text-blue-600 w-full">
                                    <Sparkles className="h-5 w-5" />
                                    <span className="font-medium">
                                        {selectedStatus.message}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-100 text-blue-600 rounded-xl shadow-md">
                                    <Sparkles className="h-5 w-5" />
                                    <span className="font-medium">
                                        Share today&apos;s learning!
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeExampleLanding;