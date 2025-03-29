// components/dashboard/DashboardContent.tsx
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
    BookOpen,
    MessageSquare,
} from "lucide-react";
import { User, Group, Post, PostType } from "@prisma/client";
import { createPost } from "@/actions/post";
import PostCard from "@/components/dashboard/PostCard";
import GroupFilter from "@/components/dashboard/GroupFilter";
import { getUserGroups, getUserFeed } from "@/actions/user";

// Update the interface to match what Prisma returns
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
    hasReacted: boolean,
    reactionType?: string,
    _count: {
        reactions: number;
    };
}

interface DashboardContentProps {
    user: User;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
    const [postType, setPostType] = useState<PostType>(PostType.MOTIVATIONAL);
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [userGroups, setUserGroups] = useState<Group[]>([]);
    const [feed, setFeed] = useState<PostWithAuthorAndGroup[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<string[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<PostType[]>([]);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const groups = await getUserGroups();
            setUserGroups(groups);

            const feedData = await getUserFeed({
                groups: filteredGroups,
                types: filteredTypes,
            });
            setFeed(feedData);
        };

        loadUserData();
    }, [filteredGroups, filteredTypes]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedGroup || !content || isSubmitting) return;

        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("groupId", selectedGroup);
            formData.append("content", content);
            formData.append("type", postType);
            if (image) {
                formData.append("image", image);
            }

            await createPost(formData);

            // Reset form
            setContent("");
            setImage(null);
            setImagePreview(null);
            setShowCreatePost(false);

            // Refresh feed
            const feedData = await getUserFeed({
                groups: filteredGroups,
                types: filteredTypes,
            });
            setFeed(feedData);
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGroupFilterChange = (groups: string[]) => {
        setFilteredGroups(groups);
    };

    const handleTypeFilterChange = (type: PostType) => {
        if (filteredTypes.includes(type)) {
            setFilteredTypes(filteredTypes.filter((t) => t !== type));
        } else {
            setFilteredTypes([...filteredTypes, type]);
        }
    };

    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="relative mx-auto max-w-3xl pt-4 pb-16 px-4 sm:px-6">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-96 w-96 -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="space-y-4">
                {/* Create Post */}
                <div className="bg-white rounded-xl shadow-md p-4 relative">
                    {!showCreatePost ? (
                        // Collapsed state - Just the trigger
                        <div
                            onClick={toggleCreatePost}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                                ) : (
                                    <UserIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-gray-500 hover:bg-gray-200 transition-colors">
                                <span>What would you like to share today?</span>
                            </div>
                        </div>
                    ) : (
                        // Expanded state - Full post form
                        <form onSubmit={handleSubmit} className="animate-expand">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                                        ) : (
                                            <UserIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm md:text-base text-gray-900">{user.name || "User"}</span>
                                        <div className="flex items-center mt-1 relative">
                                            <div className="relative w-full">
                                                <select
                                                    id="group"
                                                    value={selectedGroup}
                                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                                    className="appearance-none w-full pl-2 pr-6 py-1 rounded-lg text-xs md:text-sm font-medium border border-gray-200 bg-gray-50 text-gray-700 shadow-sm focus:outline-none focus:border-blue-400 transition-all duration-200"
                                                    required
                                                >
                                                    <option value="">Choose a group</option>
                                                    {userGroups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-500">
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleCreatePost}
                                    className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mb-4">
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none bg-gray-50 placeholder-gray-500"
                    rows={3}
                    required
                    placeholder="What would you like to share today?"
                    autoFocus
                />
                                <div className="flex justify-between items-center text-xs text-gray-500 mt-1 px-1">
                                    <span>{content.length > 0 ? `${content.length} characters` : "Share your thoughts or achievements"}</span>
                                    {content.length > 200 && content.length <= 500 && <span className="text-amber-500">Keep it concise</span>}
                                    {content.length > 500 && <span className="text-red-500">Your post is getting long</span>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between border-t border-b py-3 border-gray-100">
                                    <div className="text-sm text-gray-600 font-medium">Post type:</div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPostType(PostType.MOTIVATIONAL)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                        transition-all duration-200 ${
                                                postType === PostType.MOTIVATIONAL
                                                    ? "bg-blue-50 text-blue-600 font-medium ring-1 ring-blue-200"
                                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                        >
                                            <Flame className={`h-3.5 w-3.5 ${postType === PostType.MOTIVATIONAL ? "text-blue-500" : "text-gray-500"}`} />
                                            <span>Motivational</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPostType(PostType.ACHIEVEMENT)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                        transition-all duration-200 ${
                                                postType === PostType.ACHIEVEMENT
                                                    ? "bg-blue-50 text-blue-600 font-medium ring-1 ring-blue-200"
                                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                        >
                                            <Award className={`h-3.5 w-3.5 ${postType === PostType.ACHIEVEMENT ? "text-blue-500" : "text-gray-500"}`} />
                                            <span>Achievement</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {postType === PostType.MOTIVATIONAL && (
                                <div className="mb-4">
                                    <div className={`flex items-center justify-center border border-dashed rounded-xl p-4 transition-colors duration-200 ${imagePreview ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        {imagePreview ? (
                                            <div className="relative w-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto rounded-lg max-h-36 object-contain shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImage(null);
                                                        setImagePreview(null);
                                                    }}
                                                    className="absolute top-2 right-2 rounded-full bg-gray-800 bg-opacity-70 p-1.5 text-white hover:bg-opacity-100 transition-opacity duration-200"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-2">
                                                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
                                                    <ImageIcon className="h-6 w-6 text-blue-500" />
                                                </div>
                                                <div className="mt-2">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    >
                                                        <span>Add a photo</span>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedGroup || !content}
                                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200
                    ${isSubmitting || !selectedGroup || !content
                                        ? "bg-blue-300 text-white cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-500"
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    <span>{isSubmitting ? "Posting..." : "Post"}</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Your Feed</h2>
                        <button
                            onClick={toggleFilters}
                            className="inline-flex items-center gap-1 px-3.5 py-3 rounded-full text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Filter className="h-3.5 w-3.5" />
                            <span>{showFilters ? "Hide filters" : "Filter"}</span>
                        </button>
                    </div>

                    {showFilters && (
                        <div className="mt-3 space-y-4 pt-3 border-t border-gray-100 animate-fadeIn">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Groups</span>
                                    <span className="text-xs text-gray-500">{filteredGroups.length ? `${filteredGroups.length} selected` : "All groups"}</span>
                                </div>
                                <GroupFilter
                                    groups={userGroups}
                                    onFilterChange={handleGroupFilterChange}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Post Types</span>
                                    <span className="text-xs text-gray-500">{filteredTypes.length ? `${filteredTypes.length} selected` : "All types"}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeFilterChange(PostType.MOTIVATIONAL)}
                                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs 
                      ${
                                            filteredTypes.includes(PostType.MOTIVATIONAL)
                                                ? "bg-blue-50 text-blue-600 font-medium ring-1 ring-blue-200"
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
                                        }`}
                                    >
                                        <Flame className="h-3.5 w-3.5" />
                                        Motivational
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeFilterChange(PostType.ACHIEVEMENT)}
                                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs
                      ${
                                            filteredTypes.includes(PostType.ACHIEVEMENT)
                                                ? "bg-blue-50 text-blue-600 font-medium ring-1 ring-blue-200"
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
                                        }`}
                                    >
                                        <Award className="h-3.5 w-3.5" />
                                        Achievement
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Post Feed */}
                <div className="space-y-4">
                    {feed.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <div className="rounded-full bg-gray-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                                <MessageSquare className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                No posts to show
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Join more groups or create your first post to get started!
                            </p>
                            <button
                                onClick={toggleCreatePost}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Create Post</span>
                            </button>
                        </div>
                    ) : (
                        feed.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                currentUser={user}
                                hasReacted={post.hasReacted}
                                reactionType={post.reactionType}
                            />
                        ))
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
                @keyframes expand {
                    from { opacity: 0.8; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-expand {
                    animation: expand 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default DashboardContent;