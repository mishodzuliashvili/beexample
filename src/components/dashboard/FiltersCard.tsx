"use client";

import { POST_TYPE_ICONS } from "@/constants/postTypeIcons";
import cn from "@/lib/cn";
import { Group, PostType } from "@prisma/client";
import {
    Award,
    BookOpen,
    Filter,
    Flame,
    Globe,
    Grid3X3,
    Home,
    Info,
    MessageSquare,
    Users,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function FiltersCard({ userGroups }: { userGroups: Group[] }) {
    // States
    const [filteredGroups, setFilteredGroups] = useState<string[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<PostType[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const filtersRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close the filters
    useEffect(() => {
        if (!showFilters) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                filtersRef.current &&
                !filtersRef.current.contains(event.target as Node)
            ) {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilters]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Handle filter changes
    const handleGroupFilterChange = (groupId: string) => {
        if (filteredGroups.includes(groupId)) {
            setFilteredGroups(filteredGroups.filter((id) => id !== groupId));
        } else {
            setFilteredGroups([...filteredGroups, groupId]);
        }
    };

    const handleTypeFilterChange = (type: PostType) => {
        if (filteredTypes.includes(type)) {
            setFilteredTypes(filteredTypes.filter((t) => t !== type));
        } else {
            setFilteredTypes([...filteredTypes, type]);
        }
    };

    const clearFilters = () => {
        setFilteredGroups([]);
        setFilteredTypes([]);
    };

    return (
        <div
            ref={filtersRef}
            className="bg-gradient-to-br from-[#2a2a30] to-[#222228] rounded-2xl shadow-lg p-5 border border-[#33333a] backdrop-blur-sm transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-200">
                        Your Feed
                    </h2>
                    {(filteredGroups.length > 0 ||
                        filteredTypes.length > 0) && (
                        <div className="flex items-center gap-1.5">
                            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                                {filteredGroups.length + filteredTypes.length}{" "}
                                active
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-xs text-gray-400 hover:text-gray-300"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={toggleFilters}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-[#333339] hover:bg-[#3a3a45] transition-all duration-200 border border-[#44444a]/30 shadow-sm"
                >
                    <Filter className="h-3.5 w-3.5" />
                    <span>{showFilters ? "Hide filters" : "Filter"}</span>
                </button>
            </div>

            <div
                className={cn("", {
                    "flex items-center gap-2 pt-2 pb-3 border-b border-[#44444a]/30 mb-4":
                        showFilters,
                })}
            >
                {/* <div
                    onClick={() => setActiveTab("feed")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                        activeTab === "feed"
                            ? "bg-[#333339] text-gray-200 shadow-md"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    <Home className="h-3.5 w-3.5" />
                    <span>Feed</span>
                </div> */}
                {/* <button
                    onClick={() => setActiveTab("discover")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                        activeTab === "discover"
                            ? "bg-[#333339] text-gray-200 shadow-md"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Discover</span>
                </button>
                <button
                    onClick={() => setActiveTab("groups")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                        activeTab === "groups"
                            ? "bg-[#333339] text-gray-200 shadow-md"
                            : "text-gray-400 hover:text-gray-300"
                    }`}
                >
                    <Users className="h-3.5 w-3.5" />
                    <span>Groups</span>
                </button> */}
            </div>

            {showFilters && (
                <div className="space-y-5 animate-fadeIn">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-blue-400" />
                                <span>Groups</span>
                            </span>
                            <span className="text-xs text-gray-400">
                                {filteredGroups.length
                                    ? `${filteredGroups.length} selected`
                                    : "All groups"}
                            </span>
                        </div>

                        {userGroups.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {userGroups.map((group) => (
                                    <button
                                        key={group.id}
                                        type="button"
                                        onClick={() =>
                                            handleGroupFilterChange(group.id)
                                        }
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-all duration-200 ${
                                            filteredGroups.includes(group.id)
                                                ? "bg-blue-900/70 text-blue-200 ring-1 ring-blue-600/50 shadow-md border"
                                                : "bg-[#333339] text-gray-300 hover:bg-[#3a3a45] border border-[#44444a]/30"
                                        }`}
                                    >
                                        <div className="h-4 w-4 rounded-full overflow-hidden bg-[#3a3a45] flex-shrink-0 flex items-center justify-center ring-1 ring-[#44444a]">
                                            {group.image ? (
                                                <img
                                                    src={group.image}
                                                    alt={group.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Grid3X3 className="h-2.5 w-2.5 text-gray-400" />
                                            )}
                                        </div>
                                        <span>{group.name}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#33333d]/50 border border-[#44444a]/30 rounded-xl p-4 text-center">
                                <div className="flex justify-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                                        <Info className="h-5 w-5 text-blue-400" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 font-medium">
                                    No groups found
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Join groups to see their posts in your feed
                                </p>
                                <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 transition-colors duration-200">
                                    Discover Groups
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                                <Flame className="h-4 w-4 text-orange-400" />
                                <span>Post Types</span>
                            </span>
                            <span className="text-xs text-gray-400">
                                {filteredTypes.length
                                    ? `${filteredTypes.length} selected`
                                    : "All types"}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(PostType).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleTypeFilterChange(type)}
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-all duration-200 ${
                                        filteredTypes.includes(type)
                                            ? "bg-blue-900/70 text-blue-200 ring-1 border ring-blue-600/50 shadow-md"
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
                                                    word.slice(1).toLowerCase()
                                            )
                                            .join(" ")}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-[#44444a]/30">
                        <button
                            onClick={clearFilters}
                            className="w-full py-2 text-sm text-center text-gray-300 hover:text-gray-200 hover:bg-[#333339] rounded-lg transition-colors duration-200"
                        >
                            Reset all filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
