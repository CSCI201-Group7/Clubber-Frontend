"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { useRouter } from "next/navigation";

interface EventItemProps {
    event: Event;
}  

export default function EventItem({ event }: EventItemProps) {

    // after backend is completed
    // useEffect(() => {
    //     const fetchEvent = async () => {
    //         const fetchedEvent: Event = await getEventById(eventId);
    //         setEvent(fetchedEvent);
    //     };
    //     fetchEvent();
    // }, [eventId]);

    const router = useRouter();

    const goToEventPage = () => {
        const queryParams = new URLSearchParams({
            id: event.id,
            organizationId: event.organizationId,
            title: event.title,
            description: event.description,
            location: event.location,
            startTime: event.startTime.toISOString(),
            endTime: event.endTime.toISOString(),
            rsvpLink: event.rsvpLink,
            imageId: event.imageId,
            attendees: event.attendees.toString(),
        });

        router.push(`/event?${queryParams.toString()}`);

    };

    if (!event) {
        return <div>Event Loading</div>;
    }

    return (
        <div 
            onClick={goToEventPage}
            className="flex flex-col items-start gap-3 bg-white rounded-xl shadow p-3 mb-3 w-full cursor-pointer hover:bg-gray-50 transition"
        >
            <div className="flex flex-col items-start gap-3 bg-white rounded-xl shadow p-3 mb-3 w-full">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                        src={event.imageId}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex flex-col overflow-hidden font-roboto">
                    <h3 className="font-bold text-sm text-black truncate">{event.title}</h3>
                    <p className="text-xs text-gray-500 truncate">Hosted By: {event.organizationId}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                </div>
            </div>
        </div>

    );
}