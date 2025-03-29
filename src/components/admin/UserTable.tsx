"use client";

import { User, UserRole, UserStatus } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import UserStatusBadge from "@/components/admin/UserStatusBadge";
import { updateUserStatus, getAllUsers, updateUserRole } from "@/actions/admin";
import { formatDistanceToNow } from "date-fns";

interface UserTableProps {
    users: User[];
    totalUsers: number;
    page: number;
    limit: number;
    searchQuery: string;
}

export default function UserTable({
    users,
    totalUsers,
    page,
    limit,
    searchQuery,
}: UserTableProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const totalPages = Math.ceil(totalUsers / limit);

    // Handle pagination
    const handlePageChange = useCallback(
        (newPage: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`/admin/users?${params.toString()}`);
        },
        [router, searchParams]
    );

    // Handle search
    const handleSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = formData.get("query") as string;

            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set("query", query);
            } else {
                params.delete("query");
            }
            params.set("page", "1");

            router.push(`/admin/users?${params.toString()}`);
        },
        [router, searchParams]
    );

    const handleRoleChange = async (userId: string, newRole: UserRole) => {
        try {
            setIsUpdating(userId);
            await updateUserRole(userId, newRole);
        } catch (error) {
            console.error("Failed to update user role:", error);
            alert("Failed to update user role. Please try again.");
        } finally {
            setIsUpdating(null);
        }
    };

    // Handle status change
    const handleStatusChange = async (
        userId: string,
        newStatus: UserStatus
    ) => {
        try {
            setIsUpdating(userId);
            await updateUserStatus(userId, newStatus);
        } catch (error) {
            console.error("Failed to update user status:", error);
            alert("Failed to update user status. Please try again.");
        } finally {
            setIsUpdating(null);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Search bar */}
            <div className="p-4 border-b">
                <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="query"
                            defaultValue={searchQuery}
                            placeholder="Search users by name or email"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                User
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Created
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={user.image}
                                                    alt={user.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <UserStatusBadge status={user.status} />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDistanceToNow(
                                            new Date(user.createdAt),
                                            { addSuffix: true }
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {isUpdating === user.id ? (
                                            <span className="text-gray-400">
                                                Updating...
                                            </span>
                                        ) : (
                                            <>
                                                {/* Status actions */}
                                                {user.status === "ACTIVE" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                user.id,
                                                                "BANNED"
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 mr-4"
                                                    >
                                                        Ban User
                                                    </button>
                                                ) : user.status === "BANNED" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                user.id,
                                                                "ACTIVE"
                                                            )
                                                        }
                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                    >
                                                        Unban User
                                                    </button>
                                                ) : user.status ===
                                                  "SUSPENDED" ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    user.id,
                                                                    "ACTIVE"
                                                                )
                                                            }
                                                            className="text-green-600 hover:text-green-900 mr-4"
                                                        >
                                                            Activate
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    user.id,
                                                                    "BANNED"
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 mr-4"
                                                        >
                                                            Ban
                                                        </button>
                                                    </>
                                                ) : null}

                                                {/* Role actions */}
                                                {user.role === "USER" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user.id,
                                                                "ADMIN"
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Make Admin
                                                    </button>
                                                ) : user.role === "ADMIN" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                user.id,
                                                                "USER"
                                                            )
                                                        }
                                                        className="text-orange-600 hover:text-orange-900"
                                                    >
                                                        Remove Admin
                                                    </button>
                                                ) : null}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() =>
                                handlePageChange(Math.max(1, page - 1))
                            }
                            disabled={page === 1}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                page === 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() =>
                                handlePageChange(Math.min(totalPages, page + 1))
                            }
                            disabled={page === totalPages}
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                page === totalPages
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing{" "}
                                <span className="font-medium">
                                    {(page - 1) * limit + 1}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {Math.min(page * limit, totalUsers)}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {totalUsers}
                                </span>{" "}
                                results
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <button
                                    onClick={() =>
                                        handlePageChange(Math.max(1, page - 1))
                                    }
                                    disabled={page === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                        page === 1
                                            ? "text-gray-300"
                                            : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Page numbers */}
                                {Array.from(
                                    { length: Math.min(5, totalPages) },
                                    (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (page <= 3) {
                                            pageNum = i + 1;
                                        } else if (page >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = page - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() =>
                                                    handlePageChange(pageNum)
                                                }
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    page === pageNum
                                                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    }
                                )}

                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            Math.min(totalPages, page + 1)
                                        )
                                    }
                                    disabled={page === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                        page === totalPages
                                            ? "text-gray-300"
                                            : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
