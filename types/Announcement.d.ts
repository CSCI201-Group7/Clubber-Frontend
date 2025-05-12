interface Announcement {
    id: AnnouncementId;
    organizationId: OrganizationId;
    authorId: UserId;
    title: string;
    content: string;
    attachmentIds: FileId[];
    createdAt: string;
    updatedAt: string;
}