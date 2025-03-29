import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import GroupForm from "@/components/admin/GroupForm";

export default function CreateGroupPage() {
    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/admin/groups"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Groups
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">
                    Create New Group
                </h1>
                <p className="text-gray-600 mt-1">
                    Create a new group for users to join and share posts
                </p>
            </div>

            <div className="bg-white shadow rounded-xl p-6 max-w-2xl">
                <GroupForm />
            </div>
        </div>
    );
}
