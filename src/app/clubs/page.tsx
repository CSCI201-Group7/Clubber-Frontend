"use client";

import NavBar from "@/components/NavBar";
import AllClubs from "@/components/clubs/AllClubs";
import MyClubs from "@/components/clubs/MyClubs";
import { getToken, getUserId } from "@/utilities/Fetcher";
import { getAllClubs, getClubsByUserId } from "@/utilities/getters";
import { useEffect, useState } from "react";

export default function ClubsPage() {
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [myClubs, setMyClubs] = useState<Organization[]>([]);
    const [allClubs, setAllClubs] = useState<Organization[]>([]);

    const [isMyClubEmpty, setIsMyClubEmpty] = useState<boolean>(false);
    const [isAllClubEmpty, setIsAllClubEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getToken().then((token) => {
            if (token) {
                setToken(token);
                console.log(token);
            }
        });

        getUserId().then((userId) => {
            if (userId) {
                setUserId(userId);
                console.log(userId);
            }
        });
    }, []);

    useEffect(() => {
        if (token && userId) {
            getClubsByUserId(userId).then((clubs) => {
                if (clubs) {
                    setMyClubs(clubs);
                    setIsMyClubEmpty(clubs.length === 0);
                }
            });

            getAllClubs().then((clubs) => {
                if (clubs) {
                    setAllClubs(clubs);
                    setIsAllClubEmpty(clubs.length === 0);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, [token, userId]);

    return (
        <div className="flex flex-1 flex-col h-full w-full relative bg-neutral-100 justify-start items-center">
            <NavBar displayProfileCard={true} />

            <div className="w-full max-w-1/2 h-full flex flex-col justify-start items-start gap-4 py-4 px-8 bg-white">
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-xl font-semibold">Loading...</p>
                    </div>
                ) : (
                    <>
                        <MyClubs
                            myClubs={myClubs}
                            isMyClubEmpty={isMyClubEmpty}
                        />
                        <AllClubs
                            allClubs={allClubs}
                            isAllClubEmpty={isAllClubEmpty}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
