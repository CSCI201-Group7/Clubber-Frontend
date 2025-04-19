"use client";
import Image from "next/image";
import { useState } from "react";
import { Event } from "@/types/Event";

export default function EventItem_home({ eventId }: { eventId: string }) {
    const [event, setEvent] = useState<Event | null>({
        id: "1" as EventId,
        organizationId: "1" as OrganizationId,
        title: "CSCI 201 Hackathon",
        description: "Come participate in a hackathon exclusively for CSCI 201 students!",
        location: "Ginsburg Hall, USC",
        startTime: new Date(),
        endTime: new Date(),
        rsvpLink: "https://www.usc.edu",
        imageId: "https://via.placeholder.com/400x300" as FileId,
        attendees: 8
    });

    //mock data for now
    const [organization, setOrganization] = useState({
        id: "1" as OrganizationId,
        name: "USC Coding Club",
        type: "Academic" as OrganizationType
    });

    if (!event) {
        return <div>Event Loading</div>;
    }

    //once backend is complete
    // useEffect(() => {
    // }, [eventID]);


    return (
        <div className="bg-gray-50 p-4 my-3 w-full rounded-lg shadow-sm">
            <div className="flex items-start space-x-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-200">
                    <Image
                        src={event.imageId}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-center mb-2">
                        <div className="text-white h-8 w-8 rounded-full bg-usc-cardinal-red flex items-center justify-center font-bold mr-2">
                            {organization.name.charAt(0)}
                        </div>
                        <h3 className="text-gray-900 font-semibold">{organization.name}</h3>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                        {event.title}
                    </h2>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        {event.location}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        {event.startTime.toLocaleDateString()} - {event.endTime.toLocaleDateString()}
                    </div>

                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                        {event.description}
                    </p>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            {event.attendees} attending
                        </p>
                        <a
                            href={event.rsvpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm font-semibold"
                        >
                            RSVP Here: 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
