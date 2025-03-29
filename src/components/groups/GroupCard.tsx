'use client';

import { Users, Clock, Check } from "lucide-react";
import { joinGroup, leaveGroup, cancelJoinRequest } from "@/actions/group";
import { useState } from "react";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    image: string;
    slug: string;
  };
  memberStatus?: "ACTIVE" | "PEDNING" | "BANNED" | "SUSPENDED" | null;
  memberCount: number;
}

export function GroupCard({ group, memberStatus, memberCount }: GroupCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'join' | 'leave' | 'cancel') => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'join':
          await joinGroup(group.id);
          break;
        case 'leave':
          await leaveGroup(group.id);
          break;
        case 'cancel':
          await cancelJoinRequest(group.id);
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="h-32 w-full relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {group.name}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Users className="h-4 w-4" />
          <span>{memberCount} members</span>
        </div>

        {memberStatus === "ACTIVE" ? (
          <button
            onClick={() => handleAction('leave')}
            disabled={isLoading}
            className="w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-500 transition-all duration-200 disabled:opacity-50"
          >
            Leave Group
          </button>
        ) : memberStatus === "PEDNING" ? (
          <button
            onClick={() => handleAction('cancel')}
            disabled={isLoading}
            className="w-full rounded-xl bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-500 transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              Cancel Request
            </div>
          </button>
        ) : (
          <button
            onClick={() => handleAction('join')}
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              Join Group
            </div>
          </button>
        )}
      </div>
    </div>
  );
}