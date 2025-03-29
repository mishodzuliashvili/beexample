import cn from "@/lib/cn";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
export default function SignOutButton({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return <LogoutLink className={cn(className)}>{children}</LogoutLink>;
}
