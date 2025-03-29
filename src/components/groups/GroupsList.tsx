import { prisma } from "@/lib/prisma";
import { GroupCard } from "./GroupCard";

interface GroupsListProps {
    userId: string;
}

export async function GroupsList({ userId }: GroupsListProps) {
    const groups = await prisma.group.findMany({
        include: {
            members: {
                where: {
                    userId: userId,
                },
            },
            _count: {
                select: {
                    members: true,
                },
            },
        },
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
                Available Groups
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                    <GroupCard
                        key={group.id}
                        group={group}
                        memberStatus={group.members[0]?.status}
                        memberCount={group._count.members}
                    />
                ))}
            </div>
        </div>
    );
}
