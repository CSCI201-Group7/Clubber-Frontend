export interface Event {
    id: EventId;
    organizationId: OrganizationId;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    rsvpLink: string;
    imageId: FileId;
    attendees: number;
}