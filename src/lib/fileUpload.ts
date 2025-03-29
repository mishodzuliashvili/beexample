import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type UploadFileOptions = {
    folderName?: string;
    userId: string;
    allowedTypes?: string[];
    maxSizeMB?: number;
};

export async function uploadFile(
    file: File,
    options: UploadFileOptions
): Promise<{ success: boolean; error?: string; filePath?: string }> {
    try {
        const {
            folderName = "uploads",
            userId,
            allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
            maxSizeMB = 5
        } = options;

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                error: `Invalid file type. Only ${allowedTypes
                    .map((t) => t.split("/")[1].toUpperCase())
                    .join(", ")} are allowed`
            };
        }

        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            return {
                success: false,
                error: `File too large. Maximum size is ${maxSizeMB}MB`
            };
        }

        // Create unique filename with user ID prefix
        const uniqueId = uuidv4();
        const extension = file.name.split(".").pop();
        const filename = `${userId}_${uniqueId}.${extension}`;

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
        const urlPath = `/api/uploads/${folderName}/${filename}`;

        return {
            success: true,
            filePath: urlPath
        };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            success: false,
            error: "Failed to upload file"
        };
    }
}