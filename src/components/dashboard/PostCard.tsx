"use client";
import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import {
    Heart,
    Award,
    Flame,
    User as UserIcon,
    ThumbsUp,
    Star,
    Laugh,
    Trophy,
    Trash,
} from "lucide-react";
import { User, Post, PostType } from "@prisma/client";
import { createReaction, deletePost, removeReaction } from "@/actions/post";

interface PostWithAuthorAndGroup extends Post {
    author: {
        id: string;
        name: string;
        image: string;
    };
    group: {
        id: string;
        name: string;
        image: string;
    };
    _count: {
        reactions: number;
    };
}

interface PostCardProps {
    post: PostWithAuthorAndGroup;
    currentUser: User;
    hasReacted: boolean;
    reactionType?: string;
}

const PostCard = ({
    post,
    currentUser,
    hasReacted,
    reactionType = "LIKE",
}: PostCardProps) => {
    const [reactionCount, setReactionCount] = useState(post._count.reactions);
    const [userHasReacted, setUserHasReacted] = useState(hasReacted);
    const [userReactionType, setUserReactionType] =
        useState<string>(reactionType);
    const [showReactionSelector, setShowReactionSelector] = useState(false);
    const reactionSelectorRef = useRef<HTMLDivElement>(null);
    const reactionButtonRef = useRef<HTMLButtonElement>(null);

    // Close reaction selector when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                reactionSelectorRef.current &&
                !reactionSelectorRef.current.contains(event.target as Node) &&
                reactionButtonRef.current &&
                !reactionButtonRef.current.contains(event.target as Node)
            ) {
                setShowReactionSelector(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDelete = async () => {
        if (currentUser.role !== "ADMIN") return;

        try {
            await deletePost(post.id);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleReaction = async (type: string) => {
        // If already reacted with the same type, remove the reaction
        if (userHasReacted && userReactionType === type) {
            try {
                await removeReaction({ postId: post.id });
                setReactionCount((prev) => prev - 1);
                setUserHasReacted(false);
                setUserReactionType("LIKE");
            } catch (error) {
                console.error("Error removing reaction:", error);
            }
            return;
        }

        // If already reacted but with different type, remove the old reaction first
        if (userHasReacted && userReactionType !== type) {
            try {
                await removeReaction({ postId: post.id });
                // Don't decrement count here as we'll add a new reaction immediately
            } catch (error) {
                console.error("Error removing previous reaction:", error);
                return;
            }
        } else if (!userHasReacted) {
            // If not reacted before, increment the count
            setReactionCount((prev) => prev + 1);
        }

        // Add new reaction
        try {
            await createReaction({
                postId: post.id,
                type,
            });

            setUserHasReacted(true);
            setUserReactionType(type);
            setShowReactionSelector(false);
        } catch (error) {
            console.error("Error creating reaction:", error);
            // Revert the count change if failed
            if (!userHasReacted) {
                setReactionCount((prev) => prev - 1);
            }
        }
    };

    // Get reaction icon based on type
    const getReactionIcon = (type: string, filled: boolean = false) => {
        // Different treatment for different icon types
        switch (type) {
            case "LIKE":
                return filled ? (
                    <ThumbsUp
                        className="h-5 w-5"
                        strokeWidth={2}
                        fill="currentColor"
                    />
                ) : (
                    <ThumbsUp className="h-5 w-5" strokeWidth={1.5} />
                );
            case "LOVE":
                return filled ? (
                    <Heart
                        className="h-5 w-5"
                        strokeWidth={2}
                        fill="currentColor"
                    />
                ) : (
                    <Heart className="h-5 w-5" strokeWidth={1.5} />
                );
            case "LAUGH":
                // Special handling - NO FILL for Laugh icon, just bold stroke
                return (
                    <Laugh
                        className="h-5 w-5"
                        strokeWidth={filled ? 2.5 : 1.5}
                    />
                );
            case "STAR":
                return filled ? (
                    <Star
                        className="h-5 w-5"
                        strokeWidth={2}
                        fill="currentColor"
                    />
                ) : (
                    <Star className="h-5 w-5" strokeWidth={1.5} />
                );
            case "TROPHY":
                // Special handling - NO FILL for Trophy icon, just bold stroke
                return (
                    <Trophy
                        className="h-5 w-5"
                        strokeWidth={filled ? 2.5 : 1.5}
                    />
                );
            default:
                return (
                    <ThumbsUp
                        className="h-5 w-5"
                        strokeWidth={filled ? 2 : 1.5}
                    />
                );
        }
    };

    // Get color for reaction type
    const getReactionColor = (type: string) => {
        switch (type) {
            case "LIKE":
                return "text-blue-600 bg-blue-50";
            case "LOVE":
                return "text-red-600 bg-red-50";
            case "LAUGH":
                return "text-amber-600 bg-amber-50";
            case "STAR":
                return "text-yellow-600 bg-yellow-50";
            case "TROPHY":
                return "text-purple-600 bg-purple-50";
            default:
                return "text-blue-600 bg-blue-50";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Card Header - Author info and group badge */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center">
                    {/* Author Profile Photo */}
                    <div className="flex-shrink-0">
                        {post.author.image ? (
                            <img
                                src={post.author.image}
                                alt={post.author.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                            </div>
                        )}
                    </div>

                    {/* Author Info & Post Metadata */}
                    <div className="ml-3 flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                            {post.author.name}
                        </h3>
                        <div className="flex flex-wrap items-center text-xs text-gray-500">
                            <span>
                                {formatDistanceToNow(new Date(post.createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                            <span className="mx-1">•</span>
                            <span className="flex items-center gap-1">
                                {post.type === PostType.MOTIVATIONAL ? (
                                    <Flame className="h-3 w-3 text-orange-500" />
                                ) : (
                                    <Award className="h-3 w-3 text-purple-500" />
                                )}
                                {post.type === PostType.MOTIVATIONAL
                                    ? "Motivational"
                                    : "Achievement"}
                            </span>
                        </div>
                    </div>

                    {/* Group Badge - Right-aligned */}
                    <div className="flex-shrink-0 ml-2">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                            <span className="text-xs font-medium truncate max-w-[100px]">
                                {post.group.name}
                            </span>
                        </div>
                        {currentUser.role === "ADMIN" && (
                            <button
                                onClick={handleDelete}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                title="Delete post"
                            >
                                <Trash className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5">
                {/* Post Text */}
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                    {post.content}
                </p>

                {/* Post Image - if available */}
                {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Reactions Bar */}
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    {/* Reaction Button with Count */}
                    <div className="relative">
                        <button
                            ref={reactionButtonRef}
                            onClick={() => {
                                if (userHasReacted) {
                                    void handleReaction(userReactionType);
                                } else {
                                    setShowReactionSelector(
                                        !showReactionSelector
                                    );
                                }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors duration-200 ${
                                userHasReacted
                                    ? getReactionColor(userReactionType)
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            aria-label={
                                userHasReacted
                                    ? `Reacted with ${userReactionType.toLowerCase()}`
                                    : "React to post"
                            }
                        >
                            {userHasReacted ? (
                                getReactionIcon(userReactionType, true)
                            ) : (
                                <Heart className="h-5 w-5" />
                            )}
                            <span className="font-medium">{reactionCount}</span>
                        </button>

                        {/* Reaction Selector Popup */}
                        {showReactionSelector && (
                            <div
                                ref={reactionSelectorRef}
                                className="absolute left-0 bottom-12 z-10 flex items-center space-x-1 bg-white rounded-full shadow-lg p-2 border border-gray-200"
                            >
                                {(
                                    [
                                        "LIKE",
                                        "LOVE",
                                        "LAUGH",
                                        "STAR",
                                        "TROPHY",
                                    ] as string[]
                                ).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() =>
                                            void handleReaction(type)
                                        }
                                        className={`p-2 rounded-full transition-transform hover:scale-125 ${
                                            userHasReacted &&
                                            userReactionType === type
                                                ? getReactionColor(type)
                                                : "hover:bg-gray-100"
                                        }`}
                                        aria-label={`React with ${type.toLowerCase()}`}
                                    >
                                        {getReactionIcon(
                                            type,
                                            userHasReacted &&
                                                userReactionType === type
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Post type indicator - Right aligned */}
                    <div className="text-xs text-gray-500 flex items-center">
                        {post.type === PostType.MOTIVATIONAL ? (
                            <>
                                <Flame className="h-4 w-4 text-orange-500 mr-1" />
                                <span className="hidden sm:inline">
                                    Motivational
                                </span>
                            </>
                        ) : (
                            <>
                                <Award className="h-4 w-4 text-purple-500 mr-1" />
                                <span className="hidden sm:inline">
                                    Achievement
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
