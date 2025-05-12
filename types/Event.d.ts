interface Event {
    id: EventId;
    organizationId: OrganizationId;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    rsvpLink: string;
    attachmentIds: FileId[];
}