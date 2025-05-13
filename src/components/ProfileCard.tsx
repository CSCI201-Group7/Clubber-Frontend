"use client";

import { getSelf, logout } from "@/utilities/Fetcher";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
    const [username, setUsername] = useState("Login");
    const [logoUrl, setLogoUrl] = useState("/default-profile.svg");
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // on load
        getSelf().then((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            if (user.profileImageId) {
                setLogoUrl(
                    `http://localhost:8080/files/${user.profileImageId}`
                );
            }
        } else {
            setUsername("Login");
            setLogoUrl("/default-profile.svg");
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push("/authenticate?type=login");
    };

    return (
        <div className="flex flex-row items-center gap-4 mr-10">
            <div
                className="ProfileCard w-fit h-fit flex flex-row justify-center items-center 
                        bg-usc-cardinal-light px-6 py-2 outline-1 outline-usc-gold-light rounded-xl
                        hover:outline-3 hover:outline-usc-gold-light transition-all duration-300">
                <Link
                    className="w-full h-full flex flex-row justify-between items-center gap-2"
                    href={
                        user ? `/users/${user.id}` : "/authenticate?type=login"
                    }>
                    <div className="text-white text-2xl text-center font-bold">
                        {username}
                    </div>
                    <Image
                        className="w-8 h-8 bg-white rounded-full"
                        src={logoUrl}
                        alt="profile-logo"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
            {user && (
                <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-white text-usc-cardinal-red font-semibold px-4 py-2 rounded-lg 
                               hover:bg-gray-200 transition-colors duration-200 outline outline-gray-300">
                    Logout
                </button>
            )}
        </div>
    );
}
