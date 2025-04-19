const enum ReportReason {
    Inappropriate = "Inappropriate",
    Misleading = "Misleading",
    Spam = "Spam",
    Other = "Other",
}

const enum ReportStatus {
    Pending = "Pending",
    Reviewed = "Reviewed",
    Resolved = "Resolved",
}

interface Report {
    id: ReportId;
    reporterId: UserId;
    contentId: ReviewId | CommentId;
    reason: ReportReason;
    description: string;
    status: ReportStatus;
    timeCreated: Date;
}
