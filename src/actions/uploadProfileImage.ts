"use server";
import { getUser } from "@/lib/auth";
import { createRateLimiter, createRateLimitInfoSA } from "@/lib/rateLimiter";
import { uploadFile } from "@/lib/fileUpload";

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

        const { folderName = "profile-images" } = options;

        // Use the shared upload function
        const uploadResult = await uploadFile(file, {
            userId: user.id,
            folderName: folderName,
            allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            maxSizeMB: 5
        });

        if (!uploadResult.success) {
            return {
                error: uploadResult.error,
                status: 400,
                limitInfo: uploadRateLimiter.getRateLimitInfo(user.id),
                success: false,
            };
        }

        return {
            imageUrl: uploadResult.filePath,
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
