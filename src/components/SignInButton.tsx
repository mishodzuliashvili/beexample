import cn from "@/lib/cn";
import { env } from "@/lib/env";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function SignInButton({
    className,
    children,
    postSignInRedirect,
}: {
    className?: string;
    children?: React.ReactNode;
    postSignInRedirect?: string;
}) {
    return (
        <RegisterLink
            authUrlParams={{
                connection_id: env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE,
            }}
            postLoginRedirectURL={postSignInRedirect}
            className={cn(className)}
        >
            {children}
        </RegisterLink>
    );
}