interface ClubComment {
    id: CommentId;
    authorId: UserId;
    commentId: CommentId;
    reviewId: ReviewId;
    content: string;
    timeCreated: string;
    timeUpdated: string;
    upvotes: UserId[];
    downvotes: UserId[];
}
