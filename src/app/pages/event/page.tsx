"use client";

import EventItem from "@/components/home/EventItem";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function EventPage() {
    const searchParams = useSearchParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const eventId = searchParams.get("id") || "";
        const organizationId = searchParams.get("organizationId") || "";
        const title = searchParams.get("title") || "";
        const description = searchParams.get("description") || "No description available";
        const location = searchParams.get("location") || "";
        const startTime = searchParams.get("startTime") || "";
        const endTime = searchParams.get("endTime") || "";
        const rsvpLink = searchParams.get("rsvpLink") || "";
        const imageId = searchParams.get("imageId") || "No image available";
        const attendees = parseInt(searchParams.get("attendees") || "0");

        if (eventId && organizationId && title && location && startTime && endTime && rsvpLink) {
            setEvent({
                id: eventId as EventId,
                organizationId: organizationId as OrganizationId,
                title,
                description,
                location,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                rsvpLink,
                imageId: imageId as FileId,
                attendees,
            });
        }
  }, [searchParams]);

  if (!event) {
    return <div>Event Loading...</div>;
  }

//   return (
//     <div>
//       <EventItem event={event} />
//     </div>
//   );


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

            <p className="text-sm text-gray-600 mb-2 italic">
                Hosted by {event.organizationId}
            </p>


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




