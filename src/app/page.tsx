"use client";

import NavBar from "@/components/NavBar";
import { getAllEvents, getAllReviews } from "@/utilities/getters";
import { useState } from "react";
import { useEffect } from "react";

import EventItem from "@/components/home/EventItem";
import ReviewItem from "@/components/home/ReviewItem";
// import ReviewItem from "@/components/home/ReviewItem";

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        getAllEvents().then((events) => {
            setEvents(events);
        });
        getAllReviews().then((reviews) => {
            setReviews(reviews);
        });
    }, []);

    return (
        <div className="w-full h-full bg-neutral-100 flex flex-col justify-center items-center">
            <NavBar displayProfileCard={true} />
            <div
                className="BodySection w-full max-w-1/2 h-full flex-1 flex flex-col justify-start 
                items-center bg-white overflow-y-scroll p-4">
                <div className="w-full h-fit max-h-[700px] flex flex-col justify-start items-start gap-2 p-2">
                    <div className="text-4xl font-sans font-bold text-start text-black">
                        Events
                    </div>
                    <div
                        className="w-full h-full flex flex-col justify-start 
                        items-start gap-2 overflow-y-scroll p-4 bg-neutral-100 rounded-xl">
                        {events &&
                            events.map((event) => (
                                <EventItem key={event.id} event={event} />
                            ))}
                    </div>
                </div>

                <div className="w-full h-fit max-h-[700px] flex flex-col justify-start items-start gap-2 p-2">
                    <div className="text-4xl font-sans font-bold text-start text-black">
                        Reviews
                    </div>
                    <div className="w-full h-full flex flex-col justify-start items-start gap-2 overflow-y-scroll p-4 bg-neutral-100 rounded-xl">
                        {reviews &&
                            reviews.map((review) => (
                                <ReviewItem key={review.id} review={review} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
