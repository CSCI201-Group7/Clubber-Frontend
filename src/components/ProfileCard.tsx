"use client";

import { getUser } from "@/utilities/Fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileCard() {
    const [username, setUsername] = useState("Login");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // on load
        getUser().then((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        } else {
            setUsername("Login");
        }
    }, [user]);

    return (
        <div className="flex flex-row justify-center items-center w-fit h-fit px-10">
            <div
                className="ProfileCard w-fit h-fit flex flex-row justify-center items-center 
        bg-usc-cardinal-dark px-8 py-2 border-3 border-usc-gold-light rounded-xl">
                <Link
                    className="text-white text-2xl text-center font-bold"
                    href={user ? "/user" : "/authenticate?type=login"}>
                    {username}
                </Link>
            </div>
        </div>
    );
}
