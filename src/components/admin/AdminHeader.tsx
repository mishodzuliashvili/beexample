import Link from "next/link";
import { ArrowLeft, Users, Home } from "lucide-react";

interface AdminHeaderProps {
    title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link
                        href="/admin"
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                        <Users className="h-5 w-5" />
                        <span>Users</span>
                    </Link>
                </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
    );
}
