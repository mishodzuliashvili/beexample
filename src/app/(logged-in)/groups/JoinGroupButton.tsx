// components/groups/JoinGroupButton.tsx
"use client";

import { useState } from "react";
import { joinGroup } from "./actions";

interface JoinGroupButtonProps {
    groupId: string;
    userId: string;
}

export function JoinGroupButton({ groupId, userId }: JoinGroupButtonProps) {
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [joined, setJoined] = useState(false);

    const handleJoin = async () => {
        setIsJoining(true);
        setError(null);

        try {
            await joinGroup({
                groupId,
                userId,
            });
            setJoined(true);
        } catch (err) {
            setError("Failed to join group");
            console.error(err);
        } finally {
            setIsJoining(false);
        }
    };

    if (joined) {
        return (
            <button
                disabled
                className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
            >
                Joined ✓
            </button>
        );
    }

    return (
        <>
            <button
                onClick={handleJoin}
                disabled={isJoining}
                className={`px-3 py-1 text-xs font-medium rounded ${
                    isJoining
                        ? "bg-gray-300 text-gray-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {isJoining ? "Joining..." : "Join"}
            </button>

            {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
        </>
    );
}
