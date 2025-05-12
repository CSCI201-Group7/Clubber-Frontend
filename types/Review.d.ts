const enum ReviewStatus {
    Published = "Published",
    Draft = "Draft",
    Hidden = "Hidden",
}

interface Review {
    id: ReviewId;
    authorId: UserId;
    organizationId: OrganizationId;
    title: string;
    content: string;
    rating: {
        overall: number;
        community: number;
        activities: number;
        leadership: number;
        inclusivity: number;
    };
    fileIds: FileId[];
    createdAt: string;
    updatedAt: string;
    upvotes: UserId[];
    downvotes: UserId[];
}
