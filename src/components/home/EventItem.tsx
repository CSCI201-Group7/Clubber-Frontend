"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";

export default function EventItem({ eventId }: { eventId: string }) {

    //mock event for testing purposes
    const [event, setEvent] = useState<Event | null>({
        id: "sampleEventID" as EventId,
        organizationId: "sampleOrgID" as OrganizationId,
        title: "Sample Event Title",
        description: "This is a description of the event.",
        location: "Sample Location",
        startTime: new Date(),
        endTime: new Date(),
        rsvpLink: "https://www.usc.edu",
        imageId: "sampleImageID" as FileId,
        attendees: 8,
    });

    // after backend is completed
    // useEffect(() => {
    //     const fetchEvent = async () => {
    //         const fetchedEvent: Event = await getEventById(eventId);
    //         setEvent(fetchedEvent);
    //     };
    //     fetchEvent();
    // }, [eventId]);

    if (!event) {
        return <div>Event Loading</div>;
    }

    return (
        <div className="bg-gray-50 p-4 my-4 w-4/6 mx-auto">
            <div className="flex justify-between mb-1">
                <h2 className="text-xl font-bold text-gray-800">
                    {event.title}
                </h2>
                <h2 className="text-md font-bold text-gray-800">
                    {event.startTime.toLocaleDateString()} -{" "}
                    {event.endTime.toLocaleDateString()}
                </h2>
            </div>

            <div className="relative h-48 w-full mb-3">
                <Image
                    src={event.imageId}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full rounded-lg"
                />
            </div>

            <div className="text-left">
                <p className="text-gray-700 mb-3">{event.description}</p>
                <p className="text-gray-600">Location: {event.location}</p>
            </div>

            <div className="relative bg-gray-100 grid grid-cols-2 gap-x-5 gap-y-4 mb-3 p-2">
                <p className="text-sm text-gray-600">{event.attendees} attending</p>
                <p className="text-sm text-gray-600">
                    <a
                        href={event.rsvpLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                    >
                        Click here to RSVP to the event. 
                    </a>
                </p>
            </div>
        </div>
    );
}