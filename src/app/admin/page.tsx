import { getUser } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Users, UserPlus, User, Activity } from "lucide-react";

const prisma = new PrismaClient();

async function getStats() {
    const [totalGroups, totalMembers, pendingRequests, totalUsers] =
        await Promise.all([
            prisma.group.count(),
            prisma.groupMember.count({ where: { status: "ACTIVE" } }),
            prisma.groupMember.count({ where: { status: "PENDING" } }),
            prisma.user.count(),
        ]);

    return {
        totalGroups,
        totalMembers,
        pendingRequests,
        totalUsers,
    };
}

export default async function AdminDashboard() {
    const user = await getUser({});
    const stats = await getStats();

    const statCards = [
        {
            label: "Total Groups",
            value: stats.totalGroups,
            icon: Users,
            color: "bg-blue-500",
            link: "/admin/groups",
        },
        {
            label: "Total Members",
            value: stats.totalMembers,
            icon: UserPlus,
            color: "bg-green-500",
            link: "/admin/groups",
        },
        {
            label: "Pending Requests",
            value: stats.pendingRequests,
            icon: Activity,
            color: "bg-amber-500",
            link: "/admin/groups",
        },
        {
            label: "Total Users",
            value: stats.totalUsers,
            icon: User,
            color: "bg-indigo-500",
            link: "/admin/users",
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                    Welcome back, {user?.name}!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat) => (
                    <Link
                        href={stat.link}
                        key={stat.label}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-gray-800">
                                    {stat.value}
                                </span>
                            </div>
                            <h3 className="text-gray-600 font-medium">
                                {stat.label}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex space-x-4">
                <Link
                    href="/admin/groups/create"
                    className="inline-flex items-center justify-center py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors duration-200"
                >
                    <Users className="h-5 w-5 mr-2" />
                    Create New Group
                </Link>
            </div>
        </div>
    );
}
