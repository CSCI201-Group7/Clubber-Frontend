"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAnnouncements, getClub } from "@/utilities/Fetcher";
import PropertyItem from "@/components/clubs/details/PropertyItem";
import Markdown from "react-markdown";
import AnnouncementItem from "@/components/clubs/details/AnnouncementItem";

// url: /clubs/details/:id
export default function ClubDetailsPage() {
    const params = useParams();
    const clubId = params.id as string;
    const [club, setClub] = useState<Organization | null>(null);

    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [memberCount, setMemberCount] = useState<number>(0);
    const [reviewCount, setReviewCount] = useState<number>(0);
    const [eventCount, setEventCount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("/logo.svg");
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [hasAnnouncements, setHasAnnouncements] = useState<boolean>(false);

    useEffect(() => {
        if (clubId) {
            getClub(clubId).then(setClub);
            getAnnouncements(clubId).then((announcements) => {
                if (announcements) {
                    setAnnouncements(announcements);
                    setHasAnnouncements(announcements.length > 0);
                    console.log(announcements);
                }
            });
        }
    }, [clubId]);

    useEffect(() => {
        if (club) {
            setName(club.name);
            setLocation(club.location);
            setType(club.type);
            setMemberCount(club.memberIds.length);
            setReviewCount(club.reviewIds.length);
            setEventCount(club.eventIds.length);
            setDescription(club.description);
            if (club.profileImageId) {
                setLogo(`http://localhost:8080/files/${club.profileImageId}`);
            }
        }
    }, [club]);

    if (!clubId) {
        return <UnspecifiedClub />;
    }

    return (
        <div className="flex flex-1 flex-col h-full w-full relative bg-neutral-100 justify-start items-center">
            <NavBar displayProfileCard={true} />
            <div className="w-full max-w-1/2 h-full flex flex-col justify-start items-start gap-8 py-6 px-8 bg-white">
                <div className="w-full h-fit flex flex-row justify-start items-center gap-6">
                    <Image
                        src={logo}
                        alt={name}
                        width={45}
                        height={45}
                        className="w-25 h-25 rounded-full outline-4 outline-gray-300 
                        hover:outline-usc-gold-light transition-all duration-200"
                    />
                    <div className="text-4xl font-bold font-roboto text-black">
                        {name}
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Basics
                    </div>
                    <div className="w-full h-fit grid grid-cols-3 grid-rows-2 grid-flow-col justify-start items-center gap-3">
                        <PropertyItem label="Location" value={location} />
                        <PropertyItem label="Type" value={type} />
                        <PropertyItem
                            label="Member Count"
                            value={memberCount.toString()}
                        />
                        <PropertyItem
                            label="Review Count"
                            value={reviewCount.toString()}
                        />
                        <PropertyItem
                            label="Event Count"
                            value={eventCount.toString()}
                        />
                    </div>
                </div>

                <div className="w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Announcements
                    </div>
                    <div className="w-full h-fit flex flex-col justify-start items-start gap-6 bg-neutral-50 rounded-lg p-4">
                        {hasAnnouncements ? (
                            announcements.map((announcement) => (
                                <AnnouncementItem
                                    key={announcement.id}
                                    announcement={announcement}
                                />
                            ))
                        ) : (
                            <div className="w-full h-fit text-gray-700 text-xl text-center">
                                No announcements found
                            </div>
                        )}
                    </div>
                </div>

                <div className="Description w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Description
                    </div>
                    <div className="w-full h-fit rounded-2xl p-4 bg-neutral-50 hover:outline-2 hover:outline-usc-gold-light transition-all duration-200">
                        <Markdown>{description}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UnspecifiedClub() {
    return (
        <div className="flex flex-1 flex-col h-full w-full relative bg-neutral-100 justify-start items-center">
            <NavBar displayProfileCard={true} />
            <div className="flex flex-col items-center justify-center w-full max-w-1/2 h-full gap-1">
                <div className="text-3xl font-bold text-center">
                    Nothing to see here
                </div>
                <div className="text-center text-gray-500 text-lg">
                    Move along
                </div>
            </div>
        </div>
    );
}
