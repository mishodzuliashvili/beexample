import { prisma } from "@/lib/prisma";
import { GroupCard } from "./GroupCard";

interface GroupsListProps {
    userId: string;
}

export async function GroupsList({ userId }: GroupsListProps) {
    // Get all discoverable groups
    const allGroups = await prisma.group.findMany({
        where: {
            isDiscoverable: true,
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

    // Filter out groups the user has already joined or requested to join
    // This prevents duplicate group cards
    const availableGroups = allGroups.filter(
        (group) =>
            group.members.length === 0 ||
            (group.members[0]?.status !== "ACTIVE" &&
                group.members[0]?.status !== "PENDING")
    );

    if (availableGroups.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">
                    No more groups to discover
                </h3>
                <p className="text-gray-600 mb-4">{`You've already joined all available groups`}</p>
            </div>
        );
    }

    return (
        <div
            id="available-groups"
            className="bg-white rounded-xl shadow-sm p-8 scroll-mt-8"
        >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Discover Groups
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {availableGroups.map((group) => (
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
    );
}
