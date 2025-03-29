import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BeExample",
        short_name: "BeExample",
        description: `BeExample is a simple platform where university students can share their daily achievements and motivational posts. With just one tap, you can celebrate progress, inspire peers, and stay connected with your campus community — all without disrupting your routine.`,
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
