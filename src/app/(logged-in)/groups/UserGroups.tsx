// components/groups/UserGroups.tsx
"use client";

import { useState } from "react";
import { GroupCard } from "./GroupCard";
import { StatusUpdateModal } from "./StatusUpdateModal";
import { GroupDetailsModal } from "./GroupDetailsModal";

interface UserGroupsProps {
    user: any; // Replace with proper type when available
}

export function UserGroups({ user }: UserGroupsProps) {
    const [activeTab, setActiveTab] = useState<"owned" | "joined">("owned");
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const ownedGroups = user.ownedGroups;

    const joinedGroups = user.memberships
        .filter((membership: any) => membership.group.ownerId !== user.id)
        .map((membership: any) => membership.group);

    const handleCreateUpdate = (group: any) => {
        setSelectedGroup(group);
        setIsUpdateModalOpen(true);
    };

    const handleViewDetails = (group: any) => {
        setSelectedGroup(group);
        setIsDetailsModalOpen(true);
    };

    return (
        <div>
            <div className="flex mb-6 border-b">
                <button
                    onClick={() => setActiveTab("owned")}
                    className={`py-2 px-4 text-center font-medium transition-colors ${
                        activeTab === "owned"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Groups You Own ({ownedGroups.length})
                </button>
                <button
                    onClick={() => setActiveTab("joined")}
                    className={`py-2 px-4 text-center font-medium transition-colors ${
                        activeTab === "joined"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Groups You've Joined ({joinedGroups.length})
                </button>
            </div>

            {activeTab === "owned" && (
                <div className="space-y-4">
                    {ownedGroups.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            You don't own any groups yet. Create your first
                            group!
                        </div>
                    ) : (
                        ownedGroups.map((group: any) => (
                            <GroupCard
                                key={group.id}
                                group={group}
                                role="OWNER"
                                onCreateUpdate={() => handleCreateUpdate(group)}
                                onViewDetails={() => handleViewDetails(group)}
                            />
                        ))
                    )}
                </div>
            )}

            {activeTab === "joined" && (
                <div className="space-y-4">
                    {joinedGroups.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            You haven't joined any groups yet. Discover groups
                            to join!
                        </div>
                    ) : (
                        joinedGroups.map((group: any) => {
                            const membership = user.memberships.find(
                                (m: any) => m.groupId === group.id
                            );
                            return (
                                <GroupCard
                                    key={group.id}
                                    group={group}
                                    role={membership?.role || "MEMBER"}
                                    statusUpdate={
                                        membership?.currentStatusUpdate
                                    }
                                    onCreateUpdate={() =>
                                        handleCreateUpdate(group)
                                    }
                                    onViewDetails={() =>
                                        handleViewDetails(group)
                                    }
                                />
                            );
                        })
                    )}
                </div>
            )}

            {isUpdateModalOpen && selectedGroup && (
                <StatusUpdateModal
                    group={selectedGroup}
                    userId={user.id}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}

            {isDetailsModalOpen && selectedGroup && (
                <GroupDetailsModal
                    group={selectedGroup}
                    userId={user.id}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            )}
        </div>
    );
}
