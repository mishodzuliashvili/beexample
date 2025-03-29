"use server";

import { prisma } from "@/lib/prisma";
import { UserRole, UserStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Function to get all users with pagination and search
export async function getAllUsers({
    page = 1,
    limit = 10,
    query = "",
}: {
    page?: number;
    limit?: number;
    query?: string;
}) {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build the where clause for search
    const where = query
        ? {
              OR: [
                  { name: { contains: query, mode: "insensitive" } },
                  { email: { contains: query, mode: "insensitive" } },
              ],
          }
        : ({} as any);

    // Get users with pagination
    const users = await prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
    });

    // Get total users count for pagination
    const totalUsers = await prisma.user.count({ where });

    return { users, totalUsers };
}

// Function to update user status
export async function updateUserStatus(userId: string, status: UserStatus) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { status },
        });

        // Revalidate the admin users page
        revalidatePath("/admin/users");

        return { success: true };
    } catch (error) {
        console.error("Error updating user status:", error);
        return { success: false, error: "Failed to update user status" };
    }
}

export async function updateUserRole(userId: string, role: UserRole) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        // Revalidate the admin users page
        revalidatePath("/admin/users");

        return { success: true };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error: "Failed to update user role" };
    }
}
