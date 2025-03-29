"use client";

import { Prisma } from "@prisma/client";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
};

type AuthContextType = {
    user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
    user: _user,
}: {
    children: ReactNode;
    user: User | null;
}) => {
    const [user, setUser] = useState<User | null>(_user);

    useEffect(() => {
        setUser(_user);
    }, [_user]);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
