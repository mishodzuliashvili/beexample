// app/actions/upload.ts
"use server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "@/lib/auth";
import { createRateLimiter, createRateLimitInfoSA } from "@/lib/rateLimiter";

// Create an upload-specific rate limiter
const uploadRateLimiter = createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 3, // 3 uploads per minute
});

export const getUploadProfileImageRateLimitInfo =
    createRateLimitInfoSA(uploadRateLimiter);

type UploadOptions = {
    folderName?: string; // Optional folder name parameter
};

export async function uploadProfileImage(
    formData: FormData,
    options: UploadOptions = {}
) {
    "use server"; // Mark as server action

    try {
        // Get authenticated user
        const user = await getUser({});
        if (!user) {
            return {
                error: "Authentication required",
                status: 401,
                success: false,
            };
        }

        // Check rate limiting
        if (uploadRateLimiter.check(user.id)) {
            return {
                error: "Too many uploads. Please try again later.",
                status: 429,
                limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
                success: false,
            };
        }

        const file = formData.get("file") as File;
        if (!file) {
            return {
                error: "No file uploaded",
                status: 400,
                limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
                success: false,
            };
        }

        const { folderName = "uploads" } = options;
        const maxSizeMB = 5;
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            return {
                error: `Invalid file type. Only ${allowedTypes
                    .map((t) => t.split("/")[1].toUpperCase())
                    .join(", ")} are allowed`,
                status: 400,
                limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
                success: false,
            };
        }

        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            return {
                error: `File too large. Maximum size is ${maxSizeMB}MB`,
                status: 400,
                limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
                success: false,
            };
        }

        // Create unique filename with user ID prefix
        const uniqueId = uuidv4();
        const extension = file.name.split(".").pop();
        const filename = `${user.id}_${uniqueId}.${extension}`;

        // Get file bytes
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the path where the file will be saved
        const uploadDir = path.join(process.cwd(), "uploads", folderName);

        // Create the directory if it doesn't exist
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            console.error("Directory creation error:", error);
        }

        const filePath = path.join(uploadDir, filename);

        // Write the file to the server
        await writeFile(filePath, buffer);

        // Return the URL to the uploaded file
        const imageUrl = `/api/uploads/${folderName}/${filename}`;

        return {
            imageUrl,
            success: true,
            limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
            status: 200,
        };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            error: "Failed to upload file",
            status: 500,
            success: false,
        };
    }
}

export async function getRateLimitStatus() {
    try {
        const user = await getUser({});
        if (!user) {
            return {
                error: "Authentication required",
                status: 401,
                success: false,
            };
        }

        const limitInfo = uploadRateLimiter.getRateLimitInfo(user.id);

        return {
            limitInfo,
            success: true,
            status: 200,
        };
    } catch (error) {
        console.error("Rate limit status error:", error);
        return {
            error: "Failed to get rate limit status",
            status: 500,
            success: false,
        };
    }
}
