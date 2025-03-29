import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { env } from "@/lib/env";
import { AuthProvider } from "@/providers/AuthProvider";
import { getUser } from "@/lib/auth";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        siteName: "BeExample",
        url: env.NEXT_PUBLIC_BASE_URL,
    },
    title: "BeExample",
    description:
        "BeExample is a simple platform where university students can share their daily achievements and motivational posts. With just one tap, you can celebrate progress, inspire peers, and stay connected with your campus community — all without disrupting your routine.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = (await getUser({})) ?? null;

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider user={user}>
                    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] grid-cols-1">
                        <div>
                            <Navbar />
                        </div>
                        <main className="mt-20">{children}</main>
                        <div>
                            <Footer />
                        </div>
                    </div>
                </AuthProvider>
            </body>
            {env.NODE_ENV === "production" && (
                <Script
                    defer
                    src="https://umami.dzuliashvili.space/script.js"
                    data-website-id="5bfb092a-fc51-4c8f-8989-6d1a9c2a18d2"
                />
            )}
        </html>
    );
}
