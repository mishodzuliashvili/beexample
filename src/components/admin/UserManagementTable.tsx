import { User } from "@prisma/client";
import UserTable from "./UserTable";
import { getAllUsers } from "@/actions/admin";

interface UserTableProps {
    users: User[];
    totalUsers: number;
    page: number;
    limit: number;
    searchQuery: string;
}

export default async function UserManagementTable({
    page = 1,
    searchQuery = "",
}: {
    page: number;
    searchQuery: string;
}) {
    // Get users data from server action
    const { users, totalUsers, limit } = await getUserTableData(
        page,
        searchQuery
    );

    return (
        <UserTable
            users={users}
            totalUsers={totalUsers}
            page={page}
            limit={limit}
            searchQuery={searchQuery}
        />
    );
}

async function getUserTableData(page: number, searchQuery: string) {
    const limit = 10;
    const { users, totalUsers } = await getAllUsers({
        page,
        limit,
        query: searchQuery,
    });

    return { users, totalUsers, limit };
}
