// components/groups/GroupList.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { JoinGroupButton } from './JoinGroupButton';

interface GroupListProps {
  userId: string;
}

export async function GroupList({ userId }: GroupListProps) {
  // Fetch groups that user is not a member of
  const groups = await prisma.group.findMany({
    where: {
      AND: [
        { NOT: { ownerId: userId } },
        { NOT: { memberships: { some: { userId } } } }
      ]
    },
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      owner: { select: { name: true } },
      _count: { select: { memberships: true } }
    }
  });

  if (groups.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No groups to discover right now.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.id} className="border rounded p-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-xs text-gray-500">
                by {group.owner.name} • {group._count.memberships} members
              </p>
            </div>
            <JoinGroupButton groupId={group.id} userId={userId} />
          </div>
          {group.description && (
            <p className="text-sm mt-2 text-gray-600">{group.description}</p>
          )}
        </div>
      ))}
      <Link 
        href="/groups/discover" 
        className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-4"
      >
        View All Groups
      </Link>
    </div>
  );
}
