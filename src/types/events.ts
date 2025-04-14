export type Event = {
    id: string;
    organizationId: string;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    rsvpLink: string;
    image: string;
    attendees: number;
} 