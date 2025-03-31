"use client";

import { POST_TYPE_ICONS } from "@/constants/postTypeIcons";
import { PostType } from "@prisma/client";
import {
    Award,
    BookOpen,
    ChevronDown,
    Eye,
    EyeOff,
    Flame,
    ImageIcon,
    MessageSquare,
    Send,
    Sparkles,
    UserIcon,
    X,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function CreatePostCard({
    user,
    userGroups,
}: {
    user: {
        id: string;
        name: string;
        image: string;
    };
    userGroups: {
        id: string;
        name: string;
    }[];
}) {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState<PostType>(PostType.CONFESSION);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Handle click outside to close the create post form
    useEffect(() => {
        if (!showCreatePost) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setShowCreatePost(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showCreatePost]);

    // Focus textarea when form opens
    useEffect(() => {
        if (showCreatePost && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [showCreatePost]);

    const toggleCreatePost = () => {
        setShowCreatePost((prev) => !prev);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("content", content);
        formData.append("postType", postType);
        formData.append("isAnonymous", isAnonymous.toString());

        if (selectedGroup) {
            formData.append("groupId", selectedGroup);
        }
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                setContent("");
                setPostType(PostType.MOTIVATIONAL);
                setSelectedGroup("");
                setImage(null);
                setImagePreview(null);
                setIsAnonymous(false);
                toggleCreatePost();
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setContent("");
        setPostType(PostType.MOTIVATIONAL);
        setSelectedGroup("");
        setImage(null);
        setImagePreview(null);
        setIsAnonymous(false);
        setShowCreatePost(false);
    };

    return (
        <div
            ref={cardRef}
            className="bg-gradient-to-br from-[#2a2a30] to-[#222228] rounded-2xl shadow-lg p-5 border border-[#33333a] backdrop-blur-sm transition-all duration-300"
        >
            {!showCreatePost ? (
                <div
                    onClick={toggleCreatePost}
                    className="flex items-center gap-4 cursor-pointer group"
                >
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden shadow-inner ring-2 ring-gray-700/50">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserIcon className="h-5 w-5 text-gray-300" />
                        )}
                    </div>
                    <div className="flex-1 bg-[#33333d] rounded-full px-5 py-3 text-gray-300 group-hover:bg-[#3a3a45] transition-all duration-200 shadow-inner border border-[#44444a]/30 flex items-center">
                        <span className="opacity-70 group-hover:opacity-90 transition-opacity">
                            Share your thoughts...
                        </span>
                        <div className="ml-auto flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="animate-fadeIn">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-gray-700/50">
                                {isAnonymous ? (
                                    <EyeOff className="h-5 w-5 text-purple-400" />
                                ) : user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="h-5 w-5 text-gray-300" />
                                )}
                            </div>
                            <div>
                                <span className="font-medium text-sm text-gray-200 ">
                                    {isAnonymous ? "Anonymous" : user.name}
                                </span>
                                <div className="flex items-center mt-1.5 gap-2">
                                    <div className="relative">
                                        <select
                                            id="group"
                                            value={selectedGroup}
                                            onChange={(e) =>
                                                setSelectedGroup(e.target.value)
                                            }
                                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-medium border border-[#44444a] bg-[#333339] text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            required
                                        >
                                            <option value="">
                                                Select group
                                            </option>
                                            {userGroups.map((group) => (
                                                <option
                                                    key={group.id}
                                                    value={group.id}
                                                >
                                                    {group.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                            <ChevronDown className="h-3.5 w-3.5" />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsAnonymous(!isAnonymous)
                                        }
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                                            isAnonymous
                                                ? "bg-purple-900/60 text-purple-300 border border-purple-700/50"
                                                : "bg-[#333339] text-gray-300 border border-[#44444a] hover:bg-[#3a3a45]"
                                        }`}
                                    >
                                        {isAnonymous ? (
                                            <>
                                                <EyeOff className="h-3.5 w-3.5" />
                                                <span className="block max-w-[30px] sm:max-w-max overflow-hidden truncate">
                                                    Anonymous
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>Public</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-all duration-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mb-5">
                        <div className="relative">
                            <textarea
                                ref={textareaRef}
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full py-4 px-5 rounded-xl border border-[#44444a] focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent text-sm resize-none bg-[#33333d] text-gray-200 placeholder-gray-400/70"
                                rows={4}
                                required
                                placeholder="What would you like to share today?"
                            />
                            <div className="absolute bottom-3 right-4 opacity-60">
                                {isAnonymous && (
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-purple-900/40 text-purple-300 border border-purple-700/30">
                                        <EyeOff className="h-3 w-3" />
                                        <span>Anonymous</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-2 px-1">
                            <span>
                                {content.length > 0
                                    ? `${content.length} characters`
                                    : "Share your thoughts or achievements"}
                            </span>
                            {content.length > 200 && content.length <= 500 && (
                                <span className="text-amber-400">
                                    Keep it concise
                                </span>
                            )}
                            {content.length > 500 && (
                                <span className="text-red-400">
                                    Your post is getting long
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex items-center justify-between border-t border-b border-[#44444a]/50 py-4 flex-wrap">
                            <div className="flex gap-2 pb-1 flex-wrap">
                                {Object.values(PostType)
                                    .filter((type) => type !== PostType.OTHER)
                                    .map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setPostType(type)}
                                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200
                        ${
                            postType === type
                                ? "bg-blue-900/70 text-blue-200 ring-1 ring-blue-600/50 border shadow-md"
                                : "bg-[#333339] text-gray-300 hover:bg-[#3a3a45] border border-[#44444a]/30"
                        }`}
                                        >
                                            {POST_TYPE_ICONS[type] &&
                                                React.createElement(
                                                    POST_TYPE_ICONS[type],
                                                    { className: "h-3.5 w-3.5" }
                                                )}

                                            <span>
                                                {type
                                                    .split("_")
                                                    .map(
                                                        (word) =>
                                                            word
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            word
                                                                .slice(1)
                                                                .toLowerCase()
                                                    )
                                                    .join(" ")}
                                            </span>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <div
                            className={`flex items-center justify-center border rounded-xl p-5 transition-all duration-300 ${
                                imagePreview
                                    ? "border-blue-600/50 bg-blue-900/20"
                                    : "border-[#44444a]/50 hover:bg-[#33333d] hover:border-[#44444a]"
                            }`}
                        >
                            {imagePreview ? (
                                <div className="relative w-full">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mx-auto rounded-lg max-h-48 object-contain shadow-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 rounded-full bg-gray-900/80 p-2 text-white hover:bg-gray-800 transition-all duration-200"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center shadow-lg border">
                                        <ImageIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="mt-3">
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-md transition-all duration-200"
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
                                        <p className="text-xs text-gray-400 mt-2">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="mr-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-gray-200 hover:bg-gray-700/50 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={
                                isSubmitting || !selectedGroup || !content
                            }
                            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg transition-all duration-300
                ${
                    isSubmitting || !selectedGroup || !content
                        ? "bg-blue-800/70 text-blue-200/70 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transform hover:-translate-y-0.5"
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
    );
}
