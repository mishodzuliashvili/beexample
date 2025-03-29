import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Users, Clock, Calendar, User } from "lucide-react";
import MembersList from "@/components/admin/MembersList";

const prisma = new PrismaClient();

async function getGroup(id: string) {
    const group = await prisma.group.findUnique({
        where: { id },
        include: {
            members: {
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            owner: {
                include: {
                    user: true,
                },
            },
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });

    return group;
}

export default async function GroupDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const group = await getGroup(params.id);

    if (!group) {
        notFound();
    }

    const activeMembers = group.members.filter((m) => m.status === "ACTIVE");
    const pendingMembers = group.members.filter((m) => m.status === "PEDNING");

    const formattedDate = new Date(group.createdAt).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/admin/groups"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Groups
                </Link>
            </div>

            <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
                <div className="relative h-48 bg-gray-200">
                    <Image
                        src={group.image}
                        alt={group.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-3xl font-bold">{group.name}</h1>
                        <p className="text-gray-200 mt-1">@{group.slug}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {activeMembers.length}
                                </div>
                                <div className="text-gray-500">
                                    Active Members
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-amber-100 text-amber-600 mr-4">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {pendingMembers.length}
                                </div>
                                <div className="text-gray-500">
                                    Pending Requests
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">
                                    Created on
                                </div>
                                <div className="text-gray-900">
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Group Owners
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {group.owner.map((owner) => (
                                <div
                                    key={owner.id}
                                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                                >
                                    <div className="h-10 w-10 rounded-full overflow-hidden">
                                        <Image
                                            src={owner.user.image}
                                            alt={owner.user.name}
                                            width={40}
                                            height={40}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {owner.user.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {owner.user.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {pendingMembers.length > 0 && (
                    <div className="bg-white shadow rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                                Pending Requests ({pendingMembers.length})
                            </h2>
                        </div>
                        <MembersList
                            members={pendingMembers}
                            groupId={group.id}
                            type="pending"
                        />
                    </div>
                )}

                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Users className="h-5 w-5 text-blue-500 mr-2" />
                            Active Members ({activeMembers.length})
                        </h2>
                    </div>
                    <MembersList
                        members={activeMembers}
                        groupId={group.id}
                        type="active"
                    />
                </div>
            </div>
        </div>
    );
}
