import Image from 'next/image';

type Event = {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    rsvpLink: string;
    image: string; //double check return type
    attendees: number;
}

type EventCardProps = {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <div className="bg-white p-4 max-w-sm mx-auto my-4">
            <div className="relative h-48 w-full">
            <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="w-full"
            />
      </div>

        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-gray-700">{event.description}</p>
        <div className="text-sm text-gray-500">
            <p>Start: {event.startTime.toLocaleString()}</p>
            <p>End: {event.endTime.toLocaleString()}</p>
        </div>
        <p className="text-gray-600">Location: {event.location}</p>
        <p className="text-gray-600">{event.attendees} attending</p>
        <p className="text-gray-600">Click here to RSVP: 
            <a href={event.rsvpLink} 
            target="_blank" 
            rel="noopener noreferrer">{event.rsvpLink}
            </a>
        </p>
    </div>
    )
}
