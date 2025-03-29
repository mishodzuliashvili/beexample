import { env } from "@/lib/env";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { getUser: _getKindeUser } = getKindeServerSession();

        const kindeUser = await _getKindeUser();

        if (
            !kindeUser ||
            kindeUser === null ||
            !kindeUser.id ||
            !kindeUser.email
        ) {
            throw new Error("Something went wrong, sorry...");
        }

        let dbUser = await prisma.user.findUnique({
            where: {
                email: kindeUser.email ?? "",
            },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    email: kindeUser.email || "",
                    name: `${kindeUser.given_name || ""} ${
                        kindeUser.family_name || ""
                    }`,
                    image: kindeUser.picture || "",
                },
            });
            return NextResponse.redirect(
                `${env.NEXT_PUBLIC_BASE_URL}/edit-profile`
            );
        }
        return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/`);
    } catch (error) {
        return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/`);
    }
}
