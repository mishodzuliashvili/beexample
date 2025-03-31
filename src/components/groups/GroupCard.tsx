'use client';
import { Users, Clock, LogOut, UserPlus, MessageSquare } from "lucide-react";
import { joinGroup, leaveGroup, cancelJoinRequest } from "@/actions/group";
import { useState } from "react";
import Link from "next/link";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    image: string;
    slug: string;
    memberCount: number;
    postCount?: number;
  };
  memberStatus?: "ACTIVE" | "PENDING" | "BANNED" | null;
}

export function GroupCard({ group, memberStatus }: GroupCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(memberStatus);
  
  const handleAction = async (action: 'join' | 'leave' | 'cancel') => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'join':
          await joinGroup(group.id);
          setCurrentStatus("PENDING");
          break;
        case 'leave':
          await leaveGroup(group.id);
          setCurrentStatus(null);
          break;
        case 'cancel':
          await cancelJoinRequest(group.id);
          setCurrentStatus(null);
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 group">
      <div className="aspect-video w-full relative overflow-hidden">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {currentStatus === "ACTIVE" && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Joined
          </div>
        )}
        {currentStatus === "PENDING" && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Pending
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {group.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{group.memberCount}</span>
          </div>
          {group.postCount !== undefined && (
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{group.postCount}</span>
            </div>
          )}
        </div>

        {currentStatus === "ACTIVE" ? (
          <div className="flex gap-2">
            <Link
              href={`/groups/${group.slug}`}
              className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 text-center"
            >
              View
            </Link>
            <button
              onClick={() => handleAction('leave')}
              disabled={isLoading}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : currentStatus === "PENDING" ? (
          <button
            onClick={() => handleAction('cancel')}
            disabled={isLoading}
            className="w-full rounded-lg bg-yellow-100 border border-yellow-200 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200 transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              {isLoading ? "Processing..." : "Cancel Request"}
            </div>
          </button>
        ) : (
          <button
            onClick={() => handleAction('join')}
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="h-4 w-4" />
              {isLoading ? "Processing..." : "Join Group"}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}