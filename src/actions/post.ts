// app/actions/post.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { uploadFile } from "@/lib/fileUpload";

async function saveImage(file: File): Promise<string> {
    const user = await getUser({});

    if (!user) {
        throw new Error("User not authenticated");
    }

    const result = await uploadFile(file, {
        userId: user.id,
        folderName: "post-images",
    });

    if (!result.success || !result.filePath) {
        throw new Error(result.error || "Failed to upload image");
    }

    return result.filePath;
}

export async function createPost(formData: FormData) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    const groupId = formData.get("groupId") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate input
    if (!groupId || !content || !type) {
        throw new Error("Missing required fields");
    }

    // Check if user is member of group
    const isMember = await prisma.groupMember.findFirst({
        where: {
            userId: user.id,
            groupId,
            status: "ACTIVE",
        },
    });

    if (!isMember) {
        throw new Error("You are not a member of this group");
    }

    // Check if user already posted today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingPost = await prisma.post.findFirst({
        where: {
            // authorId: user.id,
            groupId,
            createdAt: {
                gte: today,
                lt: tomorrow,
            },
        },
    });

    if (existingPost) {
        throw new Error("You already posted in this group today");
    }

    // Save image if provided
    let imageUrl = null;
    if (imageFile && type === "MOTIVATIONAL") {
        imageUrl = await saveImage(imageFile);
    }

    // Create post
    const post = await prisma.post.create({
        data: {
            content,
            type: type as "MOTIVATIONAL" | "ACHIEVEMENT",
            image: imageUrl,
            // author: {
            //     connect: { id: user.id },
            // },
            group: {
                connect: { id: groupId },
            },
        },
    });

    revalidatePath("/dashboard");
    return post;
}

export async function createReaction({
    postId,
    type,
}: {
    postId: string;
    type: string;
}) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Check if user already reacted to this post
    const existingReaction = await prisma.reaction.findFirst({
        where: {
            postId,
            userId: user.id,
        },
    });

    if (existingReaction) {
        throw new Error("You already reacted to this post");
    }

    // Create reaction
    // const reaction = await prisma.reaction.create({
    //     data: {
    //         type,
    //         post: {
    //             connect: { id: postId },
    //         },
    //         user: {
    //             connect: { id: user.id },
    //         },
    //     },
    // });

    revalidatePath("/dashboard");
    return null;
}

// New function to remove a reaction (unlike)
export async function removeReaction({ postId }: { postId: string }) {
    const user = await getUser({});

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Check if user has a reaction to remove
    const existingReaction = await prisma.reaction.findFirst({
        where: {
            postId,
            userId: user.id,
        },
    });

    if (!existingReaction) {
        throw new Error("No reaction found to remove");
    }

    // Delete the reaction
    await prisma.reaction.delete({
        where: {
            id: existingReaction.id,
        },
    });

    revalidatePath("/dashboard");
    return { success: true };
}

export async function deletePost(postId: string) {
    const user = await getUser({
        role: true,
    });

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Check if user is admin
    if (user.role !== "ADMIN") {
        throw new Error("Only admins can delete posts");
    }

    // Delete the post and its related reactions
    await prisma.$transaction([
        prisma.reaction.deleteMany({
            where: {
                postId: postId,
            },
        }),
        prisma.post.delete({
            where: {
                id: postId,
            },
        }),
    ]);

    revalidatePath("/dashboard");
    return { success: true };
}
