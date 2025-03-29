// import { getAllUsers } from "@/actions/admin";
import UserManagementTable from "@/components/admin/UserManagementTable";
import AdminHeader from "@/components/admin/AdminHeader";
import { Suspense } from "react";
import UserTableSkeleton from "@/components/admin/UserTableSkeleton";

interface SearchParams {
    page?: string;
    query?: string;
}

export default async function AdminUsersPage({
    searchParams: _searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const searchParams = await _searchParams;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const query = searchParams.query || "";

    return (
        <div className="container mx-auto px-4">
            {/* <AdminHeader title="User Management" /> */}

            <div className="">
                <Suspense fallback={<UserTableSkeleton />}>
                    <UserManagementTable page={page} searchQuery={query} />
                </Suspense>
            </div>
        </div>
    );
}
