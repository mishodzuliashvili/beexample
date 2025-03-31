import { prisma } from "@/lib/prisma";
import { GroupCard } from "./GroupCard";
import Link from "next/link";
import { Users, Flame } from "lucide-react";

interface UsersGroupsListProps {
    userId: string;
}

export async function UsersGroupsList({ userId }: UsersGroupsListProps) {
    // Get user's groups with proper status filtering
    const userGroups = await prisma.group.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            members: {
                where: {
                    userId: userId,
                },
            },
            _count: {
                select: {
                    members: true,
                    posts: true,
                },
            },
        },
    });

    // Properly separate the groups
    const activeGroups = userGroups.filter(
        (group) => group.members[0]?.status === "ACTIVE"
    );

    const pendingGroups = userGroups.filter(
        (group) => group.members[0]?.status === "PENDING"
    );

    if (activeGroups.length === 0 && pendingGroups.length === 0) {
        return (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/20 p-8 text-center border border-gray-800">
                <div className="mx-auto w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 border border-indigo-800">
                    <Users className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                    {`You haven't joined any groups yet`}
                </h3>
                <p className="text-gray-400 mb-6">
                    Discover and join groups to connect with people who share
                    your interests
                </p>
                <Link
                    href="#available-groups"
                    className="text-blue-400 font-medium hover:text-blue-300 transition-all"
                >
                    Browse available groups
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {activeGroups.length > 0 && (
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/20 p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-8">
                        <Flame className="h-6 w-6 text-blue-400" />
                        <h2 className="text-2xl font-semibold text-white">
                            Your Groups
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {activeGroups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={{
                                    id: group.id,
                                    name: group.name,
                                    image: group.image,
                                    slug: group.slug,
                                    memberCount: group._count.members,
                                    postCount: group._count.posts,
                                }}
                                memberStatus={group.members[0]?.status}
                            />
                        ))}
                    </div>
                </div>
            )}

            {pendingGroups.length > 0 && (
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/20 p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-6 w-6 text-yellow-400 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Pending Requests
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pendingGroups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={{
                                    id: group.id,
                                    name: group.name,
                                    image: group.image,
                                    slug: group.slug,
                                    memberCount: group._count.members,
                                    postCount: group._count.posts,
                                }}
                                memberStatus={group.members[0]?.status}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
