interface ClubComment {
    id: CommentId;
    authorId: UserId;
    parentCommentId: CommentId;
    reviewId: ReviewId;
    text: string;
    timeCreated: string;
    upvotes: UserId[];
    downvotes: UserId[];
}
