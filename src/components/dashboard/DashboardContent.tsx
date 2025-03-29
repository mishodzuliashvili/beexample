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

        if (!selectedGroup || !content) return;

        try {
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

            // Refresh feed
            const feedData = await getUserFeed({
                groups: filteredGroups,
                types: filteredTypes,
            });
            setFeed(feedData);
        } catch (error) {
            console.error("Error creating post:", error);
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

    return (
        <div className="relative mx-auto max-w-7xl pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left column - Create post form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Create Post
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Post Type
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPostType(PostType.MOTIVATIONAL)
                                        }
                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                      transition-all duration-200 ${
                          postType === PostType.MOTIVATIONAL
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                                    >
                                        <Flame className="h-5 w-5" />
                                        <span className="font-medium">
                                            Motivational
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setPostType(PostType.ACHIEVEMENT)
                                        }
                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                      transition-all duration-200 ${
                          postType === PostType.ACHIEVEMENT
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                                    >
                                        <Award className="h-5 w-5" />
                                        <span className="font-medium">
                                            Achievement
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="group"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Select Group
                                </label>
                                <select
                                    id="group"
                                    value={selectedGroup}
                                    onChange={(e) =>
                                        setSelectedGroup(e.target.value)
                                    }
                                    className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select a group</option>
                                    {userGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {` What's on your mind?`}
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    required
                                />
                            </div>

                            {postType === PostType.MOTIVATIONAL && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Image
                                    </label>
                                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition-colors duration-200">
                                        {imagePreview ? (
                                            <div className="relative w-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto rounded-lg max-h-48 object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImage(null);
                                                        setImagePreview(null);
                                                    }}
                                                    className="absolute top-2 right-2 rounded-full bg-gray-800 bg-opacity-70 p-1 text-white hover:bg-opacity-100 transition-opacity duration-200"
                                                >
                                                    <Plus className="h-4 w-4 rotate-45" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="mt-2">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
                                                    >
                                                        <span>
                                                            Upload an image
                                                        </span>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={
                                                                handleImageChange
                                                            }
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

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-500 transition-all duration-200"
                            >
                                <Send className="h-5 w-5" />
                                <span>Create Post</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right column - Feed */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Your Feed
                        </h2>

                        <GroupFilter
                            groups={userGroups}
                            onFilterChange={handleGroupFilterChange}
                        />

                        <div className="mt-4 border-t pt-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Filter by type:
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTypeFilterChange(
                                            PostType.MOTIVATIONAL
                                        )
                                    }
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium 
                    ${
                        filteredTypes.includes(PostType.MOTIVATIONAL)
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                                >
                                    <Flame className="h-4 w-4" />
                                    Motivational
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTypeFilterChange(
                                            PostType.ACHIEVEMENT
                                        )
                                    }
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium 
                    ${
                        filteredTypes.includes(PostType.ACHIEVEMENT)
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                                >
                                    <Award className="h-4 w-4" />
                                    Achievement
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {feed.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">
                                    No posts to show
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Join more groups or create your first post
                                    to get started!
                                </p>
                            </div>
                        ) : (
                            feed.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    currentUser={user}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
