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
    createdAt: Date;
    updatedAt: Date;
    upvotes: UserId[];
    downvotes: UserId[];
    views: number;
    commentIds: CommentId[];
    reportIds: ReportId[];
    status: ReviewStatus;
}
