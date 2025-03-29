"use client";
import React from "react";
import { ArrowLeft, Compass, Home, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="relative mx-auto max-w-7xl pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Text content */}
                <div className="text-left">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-8">
                        <Compass className="h-4 w-4" />
                        Page Not Found
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
                        Oops! We got a bit{" "}
                        <span className="text-blue-600">lost</span>
                    </h1>

                    <p className="text-xl leading-8 text-gray-600 mb-10">
                        {`The page you're looking for doesn't seem to exist. You
                        might have mistyped the address or the page may have
                        been moved to a new location.`}
                    </p>

                    <div className="flex items-center gap-x-6">
                        <Link
                            href="/"
                            className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-all duration-200 hover:scale-105"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>

                {/* Right side - 404 Graphic */}
                <div className="relative">
                    <div className="hidden md:block relative h-[400px] mb-8">
                        {/* Decorative background circles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div
                                    key={`circle-${index}`}
                                    className={`absolute w-32 h-32 rounded-full opacity-5 ${
                                        index % 2 === 0
                                            ? "bg-blue-500"
                                            : "bg-indigo-500"
                                    }`}
                                    style={{
                                        left: `${(index * 25) % 80}%`,
                                        top: `${(index * 30) % 70}%`,
                                        transform: `scale(${1 + index * 0.2})`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* 404 Numbers */}
                        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                            <div className="flex items-center gap-4">
                                <div className="text-9xl font-bold text-gray-900 ">
                                    4
                                </div>
                                <div className="relative">
                                    <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Compass className="h-12 w-12 text-blue-600 animate-pulse" />
                                    </div>
                                </div>
                                <div className="text-9xl font-bold text-gray-900 ">
                                    4
                                </div>
                            </div>
                            <div className="text-center mt-6 text-lg font-medium text-gray-600">
                                {`  Let's find our way back`}
                            </div>
                        </div>
                    </div>

                    {/* Mobile version */}
                    <div className="block md:hidden mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="text-7xl font-bold text-gray-900 opacity-10">
                                4
                            </div>
                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Compass className="h-10 w-10 text-blue-600 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-7xl font-bold text-gray-900 opacity-10">
                                4
                            </div>
                        </div>
                        <div className="text-center text-lg font-medium text-gray-600">
                            {` Let's find our way back`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
