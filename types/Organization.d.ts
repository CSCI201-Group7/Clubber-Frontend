const enum OrganizationType {
    Academic = "Academic",
    Cultural = "Cultural",
    Sports = "Sports",
    Religious = "Religious",
    Political = "Political",
    Social = "Social",
    Recreational = "Recreational",
    Professional = "Professional",
    Hobby = "Hobby",
    Other = "Other",
}

const enum RecruitingStatus {
    Open = "Open",
    Closed = "Closed",
    Unknown = "Unknown",
}

interface Organization {
    id: OrganizationId;
    name: string;
    type: OrganizationType;
    info: {
        description: string;
        contactEmail: string;
        recruitingStatus: RecruitingStatus;
        location: string;
        links: {
            website: string;
            linkedIn: string;
            instagram: string;
            discord: string;
        };
    };
    memberIds: UserId[];
    adminIds: UserId[];
    reviewIds: ReviewId[];
    profileImageId: FileId;
    eventIds: EventId[];
    announcementIds: AnnouncementId[];
    bannerImageId: FileId;
}
