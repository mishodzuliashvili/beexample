import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Users, Plus, Clock } from "lucide-react";

const prisma = new PrismaClient();

async function getGroups() {
    const groups = await prisma.group.findMany({
        include: {
            members: {
                where: {
                    status: "ACTIVE",
                },
            },
            _count: {
                select: {
                    members: {
                        where: {
                            status: "PENDING",
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return groups;
}

export default async function GroupsPage() {
    const groups = await getGroups();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
                    <p className="text-gray-600 mt-1">
                        Manage all groups in the system
                    </p>
                </div>
                <Link
                    href="/admin/groups/create"
                    className="inline-flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors duration-200"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                </Link>
            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                    {groups.length === 0 ? (
                        <div className="py-12 text-center">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                No groups yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Get started by creating a new group
                            </p>
                            <Link
                                href="/admin/groups/create"
                                className="inline-flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Group
                            </Link>
                        </div>
                    ) : (
                        groups.map((group) => (
                            <Link
                                key={group.id}
                                href={`/admin/groups/${group.id}`}
                                className="flex items-center p-6 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="h-12 w-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                    <Image
                                        src={group.image}
                                        alt={group.name}
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                        {group.name}
                                    </h2>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Users className="h-4 w-4 mr-1" />
                                        <span>
                                            {group.members.length} active
                                            members
                                        </span>
                                        {group._count.members > 0 && (
                                            <span className="inline-flex items-center ml-3 text-amber-600">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {group._count.members} pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
