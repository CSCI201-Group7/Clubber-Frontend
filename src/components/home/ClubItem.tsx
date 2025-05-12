"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function ClubItem({ club }: { club: Organization }) {
    const [logo, setLogo] = useState<string>("/logo.svg");
    const [name, setName] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (club.profileImageId) {
            setLogo(`http://localhost:8080/files/${club.profileImageId}`);
        }
        setName(club.name);
    }, [club]);

    return (
        <div
            onClick={() => router.push(`/clubs/details/${club.id}`)}
            className="w-[300px] h-[200px] bg-neutral-50 rounded-xl flex flex-col relative
            hover:outline-usc-gold-light hover:outline-offset-2 transition-all duration-300 hover:bg-white
            justify-start items-center px-4 py-1 gap-1 outline-2 outline-gray-300">
            <div className="relative w-full h-25 flex flex-row justify-between items-center gap-2">
                <div className="flex-1 h-full flex flex-col justify-end items-start gap-2">
                    <div className="w-full h-fit text-start text-2xl font-bold font-roboto text-black">
                        {name}
                    </div>
                    <div
                        className="w-full h-fit text-start text-base font-semibold font-roboto 
                        text-gray-600 flex flex-col justify-start items-start">
                        {club.location}
                    </div>
                </div>

                <Image
                    className="object-cover w-20 h-20 rounded-full outline-4 outline-gray-300
                    hover:outline-usc-gold-light transition-all duration-300"
                    src={logo}
                    alt={name}
                    width={45}
                    height={45}
                />
            </div>

            <div
                className="w-full h-full max-h-[100px] flex flex-col justify-between items-start gap-2
                text-ellipsis overflow-hidden text-start text-md font-base font-roboto text-gray-800">
                {club.description}
            </div>
        </div>
    );
}
