"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Login from "@/components/authenticate/Login";
import Signup from "@/components/authenticate/Signup";

enum AuthenticateType {
    Login = "login",
    Signup = "signup",
}

export default function Authenticate() {
    const [authenticateType, setAuthenticateType] = useState<AuthenticateType>(AuthenticateType.Login);
    const searchParams = useSearchParams();

    useEffect(() => {
        const typeParam = searchParams.get("type");
        if (typeParam === AuthenticateType.Signup) {
            setAuthenticateType(AuthenticateType.Signup);
        } else {
            setAuthenticateType(AuthenticateType.Login);
        }
    }, [searchParams]);

    return (
        <div className="w-full h-full flex-1 flex flex-col justify-start items-center">
            <NavBar />
            <div className="w-full h-full flex-1 flex flex-col justify-start items-center pt-10 bg-neutral-100">
                {authenticateType === AuthenticateType.Login && <Login />}
                {authenticateType === AuthenticateType.Signup && <Signup />}
            </div>
        </div>
    );
}

function NavBar() {
    return (<div className="NavBar w-full h-fit flex flex-row justify-between items-center bg-usc-cardinal-red px-3 py-1.5">
        <Link href="/" className="w-fit h-fit px-2.5 py-1.5">
            <Image
                className="w-40 h-20"
                src="/assets/PrimaryMono-Gold.png"
                alt="USC Logo"
                width={80}
                height={40}
            />
        </Link>
    </div>);
}