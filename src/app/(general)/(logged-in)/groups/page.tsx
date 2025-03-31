import { Suspense } from "react";
import { getUser } from "@/lib/auth";
import { GroupsList } from "@/components/groups/GroupsList";
import { UsersGroupsList } from "@/components/groups/UsersGroupsList";
import { Search, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function GroupsPage() {
    const user = await getUser({});

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-purple-900/20 blur-3xl" />
                <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-blue-900/20 blur-3xl" />
                <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-center mb-12">
                    <div className="text-center relative">
                        <span className="absolute -top-8 -left-8 text-5xl text-blue-500 opacity-30">
                            {`"`}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-3">
                            Discover Your Community
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                            Connect with like-minded people in groups that match
                            your interests
                        </p>
                        <span className="absolute -bottom-8 -right-8 text-5xl text-blue-500 opacity-30">
                            {`"`}
                        </span>
                    </div>
                </div>

                {user ? (
                    <>
                        {/* Search and create group section */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 items-center justify-between">
                            <div className="relative w-full sm:max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Find your perfect group..."
                                    className="block w-full rounded-xl border-0 py-3 pl-11 pr-4 bg-gray-900/80 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 shadow-inner backdrop-blur-sm"
                                />
                            </div>
                            <Link
                                href="/groups/create"
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl shadow-blue-900/20 w-full sm:w-auto"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Create Group</span>
                            </Link>
                        </div>

                        <div className="space-y-12">
                            <Suspense
                                fallback={
                                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-black/20 animate-pulse">
                                        <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-64 bg-gray-800 rounded-xl"
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            >
                                <UsersGroupsList userId={user.id} />
                            </Suspense>

                            <Suspense
                                fallback={
                                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-black/20 animate-pulse">
                                        <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[...Array(6)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-64 bg-gray-800 rounded-xl"
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            >
                                <GroupsList userId={user.id} />
                            </Suspense>
                        </div>
                    </>
                ) : (
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/20 p-8 text-center my-12 max-w-md mx-auto border border-gray-800">
                        <div className="mx-auto w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 border border-blue-800">
                            <Sparkles className="h-8 w-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">
                            Join the community
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Sign in to discover and join groups with people who
                            share your interests
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-900/20"
                        >
                            Sign in
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
