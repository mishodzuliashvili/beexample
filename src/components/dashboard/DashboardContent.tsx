"use client";
import React, { useState, useEffect } from "react";
import {
    Bell,
    Filter,
    Plus,
    Image as ImageIcon,
    Send,
    User as UserIcon,
    Award,
    Flame,
    X,
    ChevronDown,
    Sparkles,
    MessageSquare,
    Heart,
    ThumbsUp,
    Laugh,
    BookOpen,
    LogOut,
    Home,
    Compass,
    Users,
} from "lucide-react";
import { User, Group, Post, PostType, ReactionType } from "@prisma/client";
import { createPost } from "@/actions/post";
import { getUserGroups, getUserFeed } from "@/actions/user";
import TopAppBar from "./TopAppBar";
import TabsNavigation from "./TabsNavigation";
import CreatePostCard from "./CreatePostCard";
import FiltersCard from "./FiltersCard";
import FixedBottomNavigation from "./FixedBottomNavigation";
import NoPostsToShow from "./NoPostsToShow";
// import { createReaction, removeReaction } from "@/actions/reaction";

// Types based on your schema
interface PostWithAuthorAndGroup extends Post {
    user?: {
        id: string;
        name: string;
        image: string;
    };
    group: {
        id: string;
        name: string;
        image: string;
    };
    hasReacted: boolean;
    reactionType?: string;
    _count: {
        reactions: number;
    };
}

interface DashboardContentProps {
    user: User;
    userGroups: Group[];
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
    user,
    userGroups,
}) => {
    const [feed, setFeed] = useState<PostWithAuthorAndGroup[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<string[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<PostType[]>([]);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState<"feed" | "discover" | "groups">(
        "feed"
    );

    // Handle reactions
    const handleReaction = async (postId: string, type: ReactionType) => {
        try {
            const post = feed.find((p) => p.id === postId);

            if (post?.hasReacted) {
                // await removeReaction(postId);
            } else {
                // await createReaction({
                //   postId,
                //   type,
                // });
            }

            // Update local state to reflect reaction change
            const updatedFeed = feed.map((p) => {
                if (p.id === postId) {
                    return {
                        ...p,
                        hasReacted: !p.hasReacted,
                        reactionType: p.hasReacted ? undefined : type,
                        _count: {
                            ...p._count,
                            reactions: p.hasReacted
                                ? p._count.reactions - 1
                                : p._count.reactions + 1,
                        },
                    };
                }
                return p;
            });

            setFeed(updatedFeed);
        } catch (error) {
            console.error("Error handling reaction:", error);
        }
    };

    // Render post cards
    const renderPostCard = (post: PostWithAuthorAndGroup) => {
        const formattedDate = new Date(post.createdAt).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            }
        );

        return (
            <div
                key={post.id}
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden border "
            >
                {/* Post header */}
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            {post.user?.image ? (
                                <img
                                    src={post.user.image}
                                    alt={post.user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserIcon className="h-5 w-5 text-blue-400" />
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-sm text-gray-200">
                                {post.user?.name || "Anonymous"}
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                                <span>{formattedDate}</span>
                                <span className="mx-1.5">•</span>
                                <div className="flex items-center gap-1">
                                    <span>{post.group.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900 text-blue-300">
                            {post.type.charAt(0) +
                                post.type
                                    .slice(1)
                                    .toLowerCase()
                                    .replace("_", " ")}
                        </span>
                    </div>
                </div>

                {/* Post content */}
                <div className="px-4 pb-3">
                    <p className="text-gray-300 text-sm whitespace-pre-line">
                        {post.content}
                    </p>
                </div>

                {/* Post image if exists */}
                {post.image && (
                    <div className="px-4 pb-4">
                        <img
                            src={post.image}
                            alt="Post attachment"
                            className="rounded-lg w-full object-cover max-h-96"
                        />
                    </div>
                )}

                {/* Reactions */}
                <div className="px-4 py-3 border-t  flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <span>{post._count.reactions} reactions</span>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() =>
                                handleReaction(post.id, ReactionType.LIKE)
                            }
                            className={`rounded-full p-1.5 ${
                                post.hasReacted &&
                                post.reactionType === ReactionType.LIKE
                                    ? "bg-blue-900 text-blue-300"
                                    : "text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() =>
                                handleReaction(post.id, ReactionType.LOVE)
                            }
                            className={`rounded-full p-1.5 ${
                                post.hasReacted &&
                                post.reactionType === ReactionType.LOVE
                                    ? "bg-red-900 text-red-300"
                                    : "text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            <Heart className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() =>
                                handleReaction(post.id, ReactionType.HAHA)
                            }
                            className={`rounded-full p-1.5 ${
                                post.hasReacted &&
                                post.reactionType === ReactionType.HAHA
                                    ? "bg-yellow-900 text-yellow-300"
                                    : "text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            <Laugh className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="">
            {/* <TopAppBar user={user} /> */}
            <div className="max-w-3xl mx-auto px-4 space-y-4 mt-4">
                <CreatePostCard user={user} userGroups={userGroups} />
                <FiltersCard userGroups={userGroups} />
                <div className="space-y-4">
                    {feed.length === 0 ? <NoPostsToShow /> : <></>}
                </div>
            </div>

            <FixedBottomNavigation />
        </div>
    );
};
