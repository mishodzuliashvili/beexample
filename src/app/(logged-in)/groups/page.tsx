// app/groups/page.tsx
import { Suspense } from 'react';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { GroupTabs } from './GroupTabs';
import { UserGroups } from './UserGroups';
import { CreateGroupForm } from './CreateGroupForm';
import { GroupList } from './GroupList';

export default async function GroupsPage() {
  const user = await getUser({
    ownedGroups: true,
    memberships: {
      include: {
        group: true,
        currentStatusUpdate: true,
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Extract owned groups
  const ownedGroups = user.ownedGroups;

  // Extract groups user has joined but doesn't own
  const joinedGroups = user.memberships
    .filter(membership => membership.group.ownerId !== user.id)
    .map(membership => membership.group);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Your Groups</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GroupTabs>
            <Suspense fallback={<div className="p-8 text-center">Loading your groups...</div>}>
              <UserGroups user={user} />
            </Suspense>
          </GroupTabs>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <CreateGroupForm userId={user.id} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Discover Groups</h2>
            <Suspense fallback={<div>Loading groups...</div>}>
              <GroupList userId={user.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}