// src/actions/member.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

type UpdateMemberStatusParams = {
    memberId: string;
    groupId: string;
    status: "ACTIVE" | "BANNED" | "SUSPENDED";
};

export async function updateMemberStatus({
    memberId,
    groupId,
    status,
}: UpdateMemberStatusParams) {
    const user = await getUser({
        role: true,
    });

    if (!user || user.role !== "ADMIN") {
        return { error: "Unauthorized. Only admins can update member status." };
    }

    try {
        // Check if the group exists
        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: {
                owner: {
                    where: { userId: user.id },
                },
            },
        });

        if (!group) {
            return { error: "Group not found" };
        }

        // Check if the current user is an admin or the owner of the group
        const isOwner = group.owner.length > 0;

        if (user.role !== "ADMIN" && !isOwner) {
            return {
                error: "Unauthorized. Only group owners or admins can update member status.",
            };
        }

        // Update the member status
        // const updatedMember = await prisma.groupMember.update({
        //     where: { id: memberId },
        //     data: { status },
        // });

        // Revalidate paths to refresh the UI
        revalidatePath(`/groups/${group.slug}`);
        revalidatePath(`/admin/groups/${group.slug}/members`);

        return { success: true, member: null };
    } catch (error) {
        console.error("Error updating member status:", error);
        return { error: "Failed to update member status. Please try again." };
    }
}
