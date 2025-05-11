"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ClubItem({ club }: { club: Organization }) {
    const [logo, setLogo] = useState<string>("/logo.svg");
    const [name, setName] = useState<string>("");
    const [memberCount, setMemberCount] = useState<number>(0);
    const [reviewCount, setReviewCount] = useState<number>(0);
    const [eventCount, setEventCount] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        if (club.profileImageId) {
            setLogo(`http://localhost:8080/files/${club.profileImageId}`);
        }
        setName(club.name);
        setMemberCount(club.memberIds.length);
        setReviewCount(club.reviewIds.length);
        setEventCount(club.eventIds.length);
    }, [club]);

    return (
        <div
            onClick={() => router.push(`/clubs/details/${club.id}`)}
            className="w-full h-fit flex flex-col justify-start items-center gap-4 bg-neutral-50 rounded-lg
                p-4 hover:bg-white hover:outline-usc-gold-light hover:outline-2 hover:outline-offset-2 
                transition-all duration-300">
            <div className="w-full h-fit flex flex-row justify-between items-center gap-4">
                <div className="w-full h-20 flex flex-row justify-start items-center gap-4">
                    <Image
                        src={logo}
                        alt={name}
                        width={80}
                        height={80}
                        className="h-full aspect-square rounded-full outline-4 outline-gray-300 
                    hover:outline-usc-gold-light transition-all duration-300"
                    />
                    <div className="w-full h-full flex flex-col justify-start items-start gap-1">
                        <div className="text-gray-900 text-2xl font-semibold font-roboto">
                            {club.name}
                        </div>
                        <div className="text-gray-600 text-md font-base font-roboto">
                            {club.type}
                        </div>
                        <div className="text-gray-600 text-sm font-base font-roboto">
                            {club.location}
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-start items-end gap-1 px-2">
                    <div className="text-end text-gray-600 text-md font-base font-roboto">
                        {memberCount} members
                    </div>
                    <div className="text-end text-gray-600 text-md font-base font-roboto">
                        {reviewCount} reviews
                    </div>
                    <div className="text-end text-gray-600 text-md font-base font-roboto">
                        {eventCount} events
                    </div>
                </div>
            </div>
        </div>
    );
}
