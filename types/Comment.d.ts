const enum CommentStatus {
    Active = "Active",
    Hidden = "Hidden",
}

const enum CommentType {
    Review = "Review",
    Comment = "Comment",
}

interface Comment {
    id: CommentId;
    authorId: UserId;
    type: CommentType;
    parentId: ReviewId | CommentId;
    content: string;
    timeCreated: Date;
    timeUpdated: Date;
    upvotes: UserId[];
    downvotes: UserId[];
    flagged: boolean;
    status: CommentStatus;
    reportIds: ReportId[];
    isClubResponse: boolean;
}
