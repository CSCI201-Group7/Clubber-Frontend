interface Announcement {
    id: AnnouncementId;
    organizationId: OrganizationId;
    title: string;
    content: string;
    timeCreated: Date;
    importance: AnnouncementImportance;
    views: number;
}

const enum AnnouncementImportance {
    Low = "Low",
    Normal = "Normal",
    High = "High",
}
