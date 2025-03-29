"use client";
import React, { useState } from "react";
import {
    Bell,
    X,
    Menu,
    Smile,
    Heart,
    Coffee,
    Sun,
    Moon,
    ActivitySquare,
} from "lucide-react";
import Link from "next/link";
import SignInButton from "./SignInButton";

const BeExampleLanding = () => {
    const [selectedStatus, setSelectedStatus] = useState<any>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const statuses = [
        {
            id: 1,
            icon: Smile,
            label: "I'm doing great!",
            color: "bg-green-500",
            position: "left-[15%] top-[25%] rotate-3",
            message: "Awesome! Spreading those positive vibes to your circle!",
        },
        {
            id: 2,
            icon: Heart,
            label: "Feeling loved",
            color: "bg-pink-500",
            position: "left-[55%] top-[23%] -rotate-6",
            message:
                "Love is in the air! Your circle will be happy to hear that!",
        },
        {
            id: 3,
            icon: Coffee,
            label: "Just busy",
            color: "bg-amber-500",
            position: "left-[20%] top-[50%] rotate-6",
            message: "Gotcha! Your circle knows you're grinding!",
        },
        {
            id: 4,
            icon: Sun,
            label: "Having fun",
            color: "bg-yellow-500",
            position: "left-[54%] top-[50%] -rotate-3",
            message: "Woohoo! Your circle is happy you're having a blast!",
        },
        {
            id: 5,
            icon: Moon,
            label: "Getting rest",
            color: "bg-indigo-500",
            position: "left-[35%] top-[74%] rotate-2",
            message: "Rest well! Your circle knows you're recharging!",
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
                        <Bell className="h-4 w-4" />
                        #1 Product of the Day
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
                        Quick check-ins for{" "}
                        <span className="text-blue-600">busy people</span>
                    </h1>

                    <p className="text-xl leading-8 text-gray-600 mb-10">
                        BeExample lets you stay connected with friends and
                        family without interrupting your day. One tap sends a
                        quick update, keeping everyone connected while you stay
                        focused on what matters.
                    </p>

                    <div className="flex items-center gap-x-6">
                        <SignInButton className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-all duration-200 hover:scale-105">
                            Get Started
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

                {/* Right side - Interactive Status Selector */}
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
                                    <ActivitySquare className="h-5 w-5" />
                                    <span className="font-medium">
                                        {selectedStatus.message}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-100 text-blue-600 rounded-xl shadow-md w-full">
                                    <ActivitySquare className="h-5 w-5" />
                                    <span className="font-medium">
                                        Try it now - How are you feeling?
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
