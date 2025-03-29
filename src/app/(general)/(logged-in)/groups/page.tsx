import { Suspense } from "react";
import { getUser } from "@/lib/auth";
import { GroupsList } from "@/components/groups/GroupsList";
import { UsersGroupsList } from "@/components/groups/UsersGroupsList";

export default async function GroupsPage() {
    const user = await getUser({});

    return (
        <div className="relative mx-auto max-w-7xl pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                        Discover{" "}
                        <span className="text-blue-600">Amazing Groups</span>
                    </h1>
                    <p className="text-xl leading-8 text-gray-600">
                        Join groups that inspire you and connect with
                        like-minded individuals
                    </p>
                </div>

                {user ? (
                    <div className="space-y-12">
                        <Suspense fallback={<div>Loading your groups...</div>}>
                            <UsersGroupsList userId={user.id} />
                        </Suspense>

                        <Suspense
                            fallback={<div>Loading available groups...</div>}
                        >
                            <GroupsList userId={user.id} />
                        </Suspense>
                    </div>
                ) : (
                    <div className="text-center">
                        <p>Please sign in to join groups</p>
                    </div>
                )}
            </div>
        </div>
    );
}
