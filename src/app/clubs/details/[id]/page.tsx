"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyItem from "@/components/clubs/details/PropertyItem";
import Markdown from "react-markdown";
import AnnouncementItem from "@/components/clubs/details/AnnouncementItem";
import EventItem from "@/components/clubs/details/EventItem";
import {
    getAnnouncementsByClubId,
    getEventsByClubId,
    getReviewsByClubId,
} from "@/utilities/getters";
import { getClubById } from "@/utilities/getters";
import ReviewItem from "@/components/clubs/details/ReviewItem";
import ReviewForm from "@/components/clubs/details/ReviewForm";

// url: /clubs/details/:id
export default function ClubDetailsPage() {
    const params = useParams();
    const clubId = params.id as string;
    const [club, setClub] = useState<Organization | null>(null);

    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [memberCount, setMemberCount] = useState<number>(0);
    const [reviewCount, setReviewCount] = useState<number>(0);
    const [eventCount, setEventCount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [logo, setLogo] = useState<string>("/logo.svg");
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        console.log(clubId);
        if (clubId) {
            getClubById(clubId).then((club) => {
                if (club) {
                    setClub(club);
                }
            });

            getAnnouncementsByClubId(clubId).then((announcements) => {
                if (announcements) {
                    setAnnouncements(announcements);
                }
            });

            getEventsByClubId(clubId).then((events) => {
                if (events) {
                    setEvents(events);
                    setEventCount(events.length);
                }
            });

            getReviewsByClubId(clubId).then((reviews) => {
                if (reviews) {
                    setReviews(reviews);
                    setReviewCount(reviews.length);
                }
            });
        }
    }, [clubId]);

    useEffect(() => {
        if (club) {
            setName(club.name);
            setLocation(club.location);
            setType(club.type);
            setEmail(club.contactEmail);
            setDescription(club.description);
            setMemberCount(club.memberIds.length);
            if (club.profileImageId) {
                setLogo(`http://localhost:8080/files/${club.profileImageId}`);
            }
        }
    }, [club]);

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
                        <PropertyItem label="Email" value={email} />
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

                <div className="Description w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Description
                    </div>
                    <div
                        className="w-full h-fit rounded-2xl px-4 py-2 bg-neutral-50 hover:outline-2 
                        hover:outline-usc-gold-light transition-all duration-200">
                        <Markdown>{description}</Markdown>
                    </div>
                </div>

                <div className="Announcements w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Announcements
                    </div>
                    <div
                        className="w-full h-fit flex flex-col justify-start items-start bg-neutral-50 rounded-lg p-4
                        hover:outline-usc-gold-light hover:outline-2 hover:-outline-offset-2 transition-all duration-300">
                        <div
                            className="w-full h-full max-h-[600px] overflow-y-auto flex flex-col justify-start items-start 
                            gap-4 p-1 rounded-lg">
                            {announcements.length > 0 ? (
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
                </div>

                <div className="Events w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Events
                    </div>
                    <div
                        className="w-full h-fit flex flex-col justify-start items-start bg-neutral-50 rounded-lg p-4
                        hover:outline-usc-gold-light hover:outline-2 hover:-outline-offset-2 transition-all duration-300">
                        <div
                            className="w-full h-full max-h-[600px] overflow-y-auto flex flex-col justify-start items-start 
                            gap-4 p-1 rounded-lg">
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <EventItem key={event.id} event={event} />
                                ))
                            ) : (
                                <div className="w-full h-fit text-gray-700 text-xl text-center">
                                    No events found
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="Reviews w-full h-fit flex flex-col justify-start items-start gap-4">
                    <div className="text-gray-900 text-3xl font-bold font-roboto">
                        Reviews
                    </div>
                    <div
                        className="w-full h-fit flex flex-col justify-start items-start bg-neutral-50 rounded-lg p-4 gap-4
                        hover:outline-usc-gold-light hover:outline-2 hover:-outline-offset-2 transition-all duration-300">
                        <CreateReviewForm />
                        <div
                            className="w-full h-full max-h-[600px] overflow-y-auto flex flex-col justify-start items-start 
                            gap-4 rounded-lg p-1">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <ReviewItem
                                        key={review.id}
                                        review={review}
                                    />
                                ))
                            ) : (
                                <div className="p-4 w-full h-fit text-gray-700 text-xl text-center">
                                    No reviews found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateReviewForm() {
    const [hidden, setHidden] = useState<boolean>(true);

    return (
        <div
            className={`w-full h-fit flex flex-col justify-start items-start bg-neutral-100 rounded-lg p-4
            hover:outline-usc-gold-light hover:outline-3 transition-all duration-300 
            hover:cursor-pointer hover:bg-white
            ${hidden ? "" : "outline outline-usc-gold-light"}`}>
            <div
                className="w-full h-fit flex flex-col justify-start items-start gap-2
                transition-all duration-500 ease-in-out">
                <div
                    onClick={() => setHidden(!hidden)}
                    className="w-full h-fit text-gray-900 text-xl font-bold font-roboto text-center">
                    Write a Review?
                </div>
                <ReviewForm hidden={hidden} setHidden={setHidden} />
            </div>
        </div>
    );
}
