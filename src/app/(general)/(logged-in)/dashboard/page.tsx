import { getUser } from "@/lib/auth";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
    const user = await getUser({
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
    });

    if (!user) {
        redirect("/signin");
    }

    const userGroups = await prisma.groupMember.findMany({
        where: {
            userId: user.id,
            status: "ACTIVE",
        },
        include: {
            group: true,
        },
    });

    return (
        <DashboardContent
            user={user}
            userGroups={userGroups.map((g) => g.group)}
        />
    );
}
