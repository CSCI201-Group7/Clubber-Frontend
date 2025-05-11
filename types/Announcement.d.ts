interface Announcement {
    id: AnnouncementId;
    organizationId: OrganizationId;
    authorId: UserId;
    title: string;
    content: string;
    attachmentIds: FileId[];
    createdAt: Date;
    updatedAt: Date;
    importance: AnnouncementImportance;
}

const enum AnnouncementImportance {
    Low = "Low",
    Normal = "Normal",
    High = "High",
}
