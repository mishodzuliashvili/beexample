import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        email: "alice@prisma.io",
        image: "someimage.jpg",
    },
    {
        name: "Bob",
        email: "bob@prisma.io",
        image: "bobimage.jpg",
    },
];

export async function main() {
    // for (const u of userData) {
    //     await prisma.user.create({ data: u });
    // }
}

main();
