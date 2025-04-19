"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ReviewItem_home({ reviewId }: { reviewId: string }) {
    const [review, setReview] = useState<Review | null>({
        title: "Highly Recommended!",
        content: "This club is great! I've been a member for 2 years and have had an amazing experience. The community is welcoming and the activities are engaging.",
        rating: {
            overall: 4.5,
            community: 5,
            activities: 4,
            leadership: 4,
            inclusivity: 5,
        },
        upvotes: ["2" as UserId, "3" as UserId],
        downvotes: [],
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "1" as UserId,
        organizationId: "1" as OrganizationId,
        fileIds: [],
        commentIds: [],
        reportIds: [],
        status: "Published" as ReviewStatus,
        id: "1" as ReviewId,
    });
    
    // Mock data for user and organization
    const [user, setUser] = useState({
        id: "1" as UserId,
        name: "John Doe",
        username: "johndoe",
        year: "Junior" as Year
    });
    
    const [organization, setOrganization] = useState({
        id: "1" as OrganizationId,
        name: "USC Coding Club",
        type: "Academic" as OrganizationType
    });

    // useEffect(() => {
    //     // TODO: Fetch review, user, and organization data when backend is ready
    // }, [reviewId]);

    return (
        <div className="bg-gray-50 p-4 my-3 w-full">
            <div className="flex items-start space-x-4">
                <div>
                    <div 
                        className="text-white h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold"
                    >
                        {user.name.charAt(0)}
                    </div>
                </div>
                
                <div>
                    <div className="flex items-center mb-2">
                        <div 
                            className="text-white h-8 w-8 rounded-full bg-usc-cardinal-red flex items-center justify-center font-bold mr-2"
                        >
                            {organization.name.charAt(0)}
                        </div>
                        <h3 className="text-gray-900 font-medium">{organization.name}</h3>
                    </div>
                    
                    <div className="flex items-center mb-2">
                        <Rating score={review.rating.overall} />
                        <span className="text-gray-500 text-sm ml-2">{review.rating.overall.toFixed(1)}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3">{review.content}</p>
                </div>
            </div>
            
            <div className="flex justify-end">
                <Votes
                    userId={"1" as UserId}
                    upvotes={review.upvotes || []}
                    downvotes={review.downvotes || []}
                />
            </div>
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
