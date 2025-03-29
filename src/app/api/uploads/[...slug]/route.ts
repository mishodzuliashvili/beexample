import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const safePath = path.join(...slug);
    const filePath = path.join(process.cwd(), "uploads", safePath);

    if (!fs.existsSync(filePath)) {
        return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const contentType =
        {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        }[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": contentType,
        },
    });
}
