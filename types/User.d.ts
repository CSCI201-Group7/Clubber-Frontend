const enum Year {
    Freshman = "Freshman",
    Sophomore = "Sophomore",
    Junior = "Junior",
    Senior = "Senior",
    Master = "Master",
    Doctor = "Doctor",
}

interface User {
    id: UserId;
    username: string;
    name: string;
    email: string;
    year: Year;
    reviewIds: ReviewId[];
    commentIds: CommentId[];
    contactIds: UserId[];
    profileImageId?: FileId;
    bio?: string;
}
