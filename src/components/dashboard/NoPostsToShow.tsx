"use client";

import { MessageSquare, Plus } from "lucide-react";

export default function NoPostsToShow({
    onCreatePost,
}: {
    onCreatePost?: () => void;
}) {
    return (
        <div className="bg-gradient-to-br from-[#2a2a30] to-[#222228] rounded-2xl shadow-lg p-6 text-center border border-[#33333a] backdrop-blur-sm transition-all duration-300">
            <div className="rounded-full bg-[#33333d] p-4 mx-auto w-20 h-20 flex items-center justify-center mb-4 shadow-inner border border-[#44444a]/30">
                <MessageSquare className="h-9 w-9 text-gray-400" />
            </div>

            <h3 className="text-lg font-medium text-gray-200">
                No posts to show
            </h3>

            <p className="mt-2 text-sm text-gray-400">
                Join more groups or create your first post to get started!
            </p>

            <button
                onClick={onCreatePost}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg
                bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 
                transform hover:-translate-y-0.5 transition-all duration-300"
            >
                <Plus className="h-4 w-4" />
                <span>Create Post</span>
            </button>
        </div>
    );
}
