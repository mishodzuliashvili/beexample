import "server-only";
import { prisma } from "./prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cache } from "react";
import { Prisma } from "@prisma/client";

type DefaultSelect = {
    id: true;
    email: true;
    image: true;
    name: true;
};

export const getUser = cache(
    async <T extends Partial<Omit<Prisma.UserSelect, keyof DefaultSelect>>>(
        select: T
    ) => {
        const kindeUser = await getKindeUser();
        if (!kindeUser?.email) return undefined;

        return (
            (await prisma.user.findUnique({
                where: { email: kindeUser.email },
                select: {
                    id: true,
                    email: true,
                    image: true,
                    name: true,
                    ...select,
                } as T & DefaultSelect,
            })) || undefined
        );
    }
);

export type GetUser<T extends Prisma.UserSelect = DefaultSelect> = NonNullable<
    Awaited<ReturnType<typeof getUser<T>>>
>;

export async function getKindeUser() {
    const { getUser: _getKindeUser } = getKindeServerSession();
    const kindeUser = await _getKindeUser();
    return kindeUser;
}
