// src/components/MembersList.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, MoreHorizontal, Ban } from "lucide-react";
import { updateMemberStatus } from "@/actions/member";

type Member = {
    id: string;
    status: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    };
};

type MembersListProps = {
    members: Member[];
    groupId: string;
    type: "pending" | "active";
};

export default function MembersList({
    members,
    groupId,
    type,
}: MembersListProps) {
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleAction = async (
        memberId: string,
        status: "ACTIVE" | "BANNED" | "SUSPENDED"
    ) => {
        setUpdatingId(memberId);
        setOpenMenuId(null);

        try {
          await updateMemberStatus({
            memberId,
            groupId,
            status
          });
        } catch (error) {
          console.error("Error updating member status:", error);
        } finally {
          setUpdatingId(null);
        }
    };

    if (members.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-gray-500">No members found</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                                src={member.user.image || "/placeholder-avatar.png"}
                                alt={member.user.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">{member.user.name}</h3>
                            <p className="text-sm text-gray-500">{member.user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {type === "pending" ? (
                            <>
                                <button
                                    onClick={() => handleAction(member.id, "ACTIVE")}
                                    disabled={updatingId === member.id}
                                    className="rounded-full p-1 text-green-600 hover:bg-green-50 disabled:opacity-50"
                                    title="Accept"
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={() => handleAction(member.id, "BANNED")}
                                    disabled={updatingId === member.id}
                                    className="rounded-full p-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                    title="Reject"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                
                                {openMenuId === member.id && (
                                    <div className="absolute right-0 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleAction(member.id, "SUSPENDED")}
                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Suspend
                                            </button>
                                            <button
                                                onClick={() => handleAction(member.id, "BANNED")}
                                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <Ban size={16} className="mr-2" />
                                                Ban
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {updatingId === member.id && (
                            <span className="ml-2 text-xs text-gray-500">Updating...</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}