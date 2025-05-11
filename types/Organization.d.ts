enum RecruitingStatus {
    Open = "Open",
    Closed = "Closed",
    Unknown = "Unknown",
}

interface OrganizationLinks {
    website?: string;
    linkedIn?: string;
    instagram?: string;
    discord?: string;
}

interface Organization {
    id: OrganizationId;
    name: string;
    type: OrganizationType;
    description: string;
    contactEmail: string;
    recruitingStatus: RecruitingStatus;
    location: string;
    links: OrganizationLinks;

    memberIds: UserId[];
    adminIds: UserId[];
    reviewIds: ReviewId[];
    profileImageId: FileId;
    eventIds: EventId[];
    announcementIds: AnnouncementId[];
}
