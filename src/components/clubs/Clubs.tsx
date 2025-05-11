// import ClubCard from "./ClubCard";
"use client";

import { useEffect, useState } from "react";
import { getToken, getClubs } from "@/utilities/Fetcher";
import ClubCard from "./ClubCard";
import ClubItem from "./ClubItem";

export default function Clubs() {
    const [token, setToken] = useState<string>("");
    const [myClubs, setMyClubs] = useState<Organization[]>([]);
    const [allClubs, setAllClubs] = useState<Organization[]>([]);

    const [isMyClubEmpty, setIsMyClubEmpty] = useState<boolean>(false);
    const [isAllClubEmpty, setIsAllClubEmpty] = useState<boolean>(false);

    useEffect(() => {
        getToken().then((token) => {
            if (token) {
                setToken(token);
            }
        });
    }, []);

    useEffect(() => {
        if (token) {
            getClubs().then((clubs) => {
                if (clubs) {
                    console.log(clubs.myClubs);
                    console.log(clubs.allClubs);
                    setMyClubs(clubs.myClubs);
                    setAllClubs(clubs.allClubs);
                    setIsMyClubEmpty(clubs.myClubs.length === 0);
                    setIsAllClubEmpty(clubs.allClubs.length === 0);
                }
            });
        }
    }, [token]);

    return (
        <div className="w-full h-full flex flex-col justify-start items-start gap-4 py-4 px-8">
            <div className="text-4xl font-bold font-roboto text-black">
                My Clubs
            </div>
            <div
                className="w-full h-fit p-4 flex flex-row justify-start items-start gap-4 bg-gray-100 rounded-lg
                px-4 py-4 overflow-x-auto">
                {isMyClubEmpty ? (
                    <div className="text-gray-600 text-2xl font-semibold font-roboto">
                        Join a club to get started!
                    </div>
                ) : (
                    <div className="flex flex-row justify-start items-start gap-3">
                        {myClubs.map((club) => (
                            <ClubCard key={club.id} club={club} />
                        ))}
                    </div>
                )}
            </div>

            <div className="text-4xl font-bold font-roboto text-black">
                All Clubs
            </div>
            <div
                className="w-full flex-1 flex flex-row justify-start items-start gap-4 bg-gray-100 rounded-lg
                p-4 overflow-x-auto overflow-y-auto">
                {isAllClubEmpty ? (
                    <div className="text-gray-600 text-2xl font-semibold font-roboto">
                        No clubs found
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col justify-start items-start gap-3 overflow-y-auto p-1">
                        {allClubs.map((club) => (
                            <ClubItem key={club.id} club={club} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
