import { getUser } from "@/lib/auth";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { redirect } from "next/navigation";

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

    return <DashboardContent user={user} />;
}
