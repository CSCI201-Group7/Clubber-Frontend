"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "@/components/authenticate/Login";
import Signup from "@/components/authenticate/Signup";
import NavBar from "@/components/NavBar";
import { getToken, getUserId } from "@/utilities/Fetcher";

enum AuthenticateType {
    Login = "login",
    Signup = "signup",
}

export default function Authenticate() {
    const router = useRouter();
    const [authenticateType, setAuthenticateType] = useState<AuthenticateType>(
        AuthenticateType.Login
    );
    const searchParams = useSearchParams();

    useEffect(() => {
        const typeParam = searchParams.get("type");
        if (typeParam === AuthenticateType.Signup) {
            setAuthenticateType(AuthenticateType.Signup);
        } else {
            setAuthenticateType(AuthenticateType.Login);
        }

        const validateUser = async () => {
            const token = await getToken();
            const userId = await getUserId();
            if (token && userId) {
                router.push("/clubs");
            }
        };

        validateUser();
    }, [searchParams, router]);

    return (
        <div className="w-full h-full flex-1 flex flex-col justify-start items-center">
            <NavBar displayProfileCard={false} />
            <div className="w-full h-full flex-1 flex flex-col justify-start items-center pt-10 bg-neutral-100">
                {authenticateType === AuthenticateType.Login && <Login />}
                {authenticateType === AuthenticateType.Signup && <Signup />}
            </div>
        </div>
    );
}
