interface ClubComment {
    id: CommentId;
    authorId: UserId;
    parentCommentId: CommentId;
    reviewId: ReviewId;
    content: string;
    timeCreated: string;
    upvotes: UserId[];
    downvotes: UserId[];
}
