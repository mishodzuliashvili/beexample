import { CompassIcon, Home, Users } from "lucide-react";

export default function TabsNavigation() {
    const activeTab: any = "feed";
    return (
        <div className="bg-[#27272c] shadow-md border-b border-[#ffffff13] mb-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex">
                    <button
                        // onClick={() => setActiveTab("feed")}
                        className={`flex-1 py-3 px-1 text-center text-sm font-medium flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                            activeTab === "feed"
                                ? "text-blue-400 border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                        }`}
                    >
                        <Home
                            size={18}
                            className={
                                activeTab === "feed"
                                    ? "text-blue-400"
                                    : "text-gray-400"
                            }
                        />
                        <span>Feed</span>
                    </button>
                    <button
                        // onClick={() => setActiveTab("discover")}
                        className={`flex-1 py-3 px-1 text-center text-sm font-medium flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                            activeTab === "discover"
                                ? "text-blue-400 border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                        }`}
                    >
                        <CompassIcon
                            size={18}
                            className={
                                activeTab === "discover"
                                    ? "text-blue-400"
                                    : "text-gray-400"
                            }
                        />
                        <span>Discover</span>
                    </button>
                    <button
                        className={`flex-1 py-3 px-1 text-center text-sm font-medium flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                            activeTab === "groups"
                                ? "text-blue-400 border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                        }`}
                    >
                        <Users
                            size={18}
                            className={
                                activeTab === "groups"
                                    ? "text-blue-400"
                                    : "text-gray-400"
                            }
                        />
                        <span>My Groups</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
