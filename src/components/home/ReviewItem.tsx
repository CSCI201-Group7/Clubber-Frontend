"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ReviewItem({ reviewId }: { reviewId: string }) {
    const [review, setReview] = useState<Review | null>({
        title: "Hightly Recommended!",
        content: "This club is great!",
        rating: {
            overall: 4.5,
            community: 5,
            activities: 4,
            leadership: 4,
            inclusivity: 5,
        },
        upvotes: [],
        downvotes: [],
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "1" as UserId,
        organizationId: "1" as OrganizationId,
        fileIds: [],
        commentIds: [],
        reportIds: [],
        status: "active" as ReviewStatus,
        id: "1" as ReviewId,
    });

    // useEffect(() => {
    //     // TODO: Fetch review from database (can wait after we completed the backend)
    //     // const fetchReview = async () => {
    //     //     const review = await getReview(reviewId);
    //     //     setReview(review);
    //     // };
    //     // fetchReview();

    // }, [reviewId]);

    return (
        <div className="bg-gray-50 p-4 my-4 w-4/6 mx-auto">
            <div className="flex justify-between mb-1">
                <h2 className="text-xl font-bold text-gray-800">
                    {review.title}
                </h2>
                <h2 className="text-md font-bold text-gray-800">
                    {review.createdAt.toLocaleDateString()}
                </h2>
            </div>
            <div className="text-left">
                <Rating score={review.rating.overall} />
                <span className="block text-xs text-gray-500 mb-3">
                    Overall
                </span>
            </div>

            <p className="text-gray-700 mb-3">{review.content}</p>

            <div className="relative bg-gray-100 grid grid-cols-2 gap-x-5 gap-y-4 mb-3 p-2  ">
                <RatingItem
                    score={review.rating.activities}
                    label="Activities"
                />
                <RatingItem
                    score={review.rating.leadership}
                    label="Leadership"
                />
                <RatingItem score={review.rating.community} label="Community" />
                <RatingItem
                    score={review.rating.inclusivity}
                    label="Inclusivity"
                />
            </div>

            <Votes
                userId={"1" as UserId}
                upvotes={review?.upvotes || []}
                downvotes={review?.downvotes || []}
            />
        </div>
    );
}

function Votes({
    userId,
    upvotes,
    downvotes,
}: {
    userId: UserId;
    upvotes: UserId[];
    downvotes: UserId[];
}) {
    return (
        <div className="flex flex-row h-fit w-fit content-center justify-center items-center gap-2">
            <div className="flex flex-row h-fit w-fit content-center justify-center items-center gap-[5px] p-1">
                <Image
                    className="cursor-pointer w-4 h-4"
                    src={
                        upvotes.includes(userId)
                            ? "/assets/arrow-up-filled.svg"
                            : "/assets/arrow-up.svg"
                    }
                    alt="Upvote"
                    width={20}
                    height={20}
                />
                <div
                    className={`text-md ${
                        upvotes.includes(userId)
                            ? "text-usc-cardinal-red font-bold"
                            : "text-gray-500"
                    }`}>
                    {upvotes.length}
                </div>
            </div>
            <div className="flex flex-row h-fit w-fit content-center justify-center items-center gap-1 p-1">
                <Image
                    className="cursor-pointer w-4 h-4"
                    src={
                        downvotes.includes(userId)
                            ? "/assets/arrow-down-filled.svg"
                            : "/assets/arrow-down.svg"
                    }
                    alt="Downvote"
                    width={20}
                    height={20}
                />
                <div
                    className={`text-sm ${
                        downvotes.includes(userId)
                            ? "text-usc-cardinal-red font-bold"
                            : "text-gray-500"
                    }`}>
                    {downvotes.length}
                </div>
            </div>
        </div>
    );
}

function RatingItem({ score, label }: { score: number; label: string }) {
    return (
        <div className="flex flex-row h-fit w-fit content-center gap-x-1">
            <div className="text-gray-900 text-md">{label}:</div>
            <Rating score={score} />
        </div>
    );
}

function Rating({ score }: { score: number }) {
    return (
        <div className="flex flex-row h-fit w-fit content-center gap-x-1">
            {Array.from({ length: 5 }, (_, i) =>
                i <= score - 1 ? (
                    <Image
                        key={i}
                        className="w-4 h-4"
                        src="/assets/rating-star-filled.svg"
                        alt="Rating Star"
                        width={20}
                        height={20}
                    />
                ) : (
                    <Image
                        key={i}
                        className="w-4 h-4"
                        src="/assets/rating-star.svg"
                        alt="Rating Star"
                        width={20}
                        height={20}
                    />
                )
            )}
        </div>
    );
}
