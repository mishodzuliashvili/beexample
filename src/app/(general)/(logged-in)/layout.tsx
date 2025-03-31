import TopAppBar from "@/components/dashboard/TopAppBar";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser({});
    if (!user) redirect("/");

    return (
        <>
            <TopAppBar user={user} />
            {children}
        </>
    );
    // return children;
}
