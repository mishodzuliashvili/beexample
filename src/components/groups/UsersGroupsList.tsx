import { prisma } from "@/lib/prisma";
import { GroupCard } from "./GroupCard";

interface UsersGroupsListProps {
  userId: string;
}

export async function UsersGroupsList({ userId }: UsersGroupsListProps) {
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
        },
      },
    },
  });

  const activeGroups = userGroups.filter(
    (group) => group.members[0]?.status === "ACTIVE"
  );
  const pendingGroups = userGroups.filter(
    (group) => group.members[0]?.status === "PEDNING"
  );

  if (activeGroups.length === 0 && pendingGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {activeGroups.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Groups</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                memberStatus={group.members[0]?.status}
                memberCount={group._count.members}
              />
            ))}
          </div>
        </div>
      )}

      {pendingGroups.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Pending Requests</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pendingGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                memberStatus={group.members[0]?.status}
                memberCount={group._count.members}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}