import { getUserById } from "@/utilities/getters";
import { useEffect } from "react";

import { useState } from "react";
import Markdown from "react-markdown";
import AttachmentItem from "./AttachmentItem";

export default function ReviewItem({ review }: { review: Review }) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [overallRating, setOverallRating] = useState<number>(0);
    const [activitiesRating, setActivitiesRating] = useState<number>(0);
    const [leadershipRating, setLeadershipRating] = useState<number>(0);
    const [communityRating, setCommunityRating] = useState<number>(0);
    const [inclusivityRating, setInclusivityRating] = useState<number>(0);
    const [createdAt, setCreatedAt] = useState<string>("");
    const [updatedAt, setUpdatedAt] = useState<string>("");
    const [author, setAuthor] = useState<User | null>(null);
    const [attachmentIds, setAttachmentIds] = useState<FileId[]>([]);

    useEffect(() => {
        setTitle(review.title);
        setContent(review.content);
        setOverallRating(review.rating.overall);
        setActivitiesRating(review.rating.activities);
        setLeadershipRating(review.rating.leadership);
        setCommunityRating(review.rating.community);
        setInclusivityRating(review.rating.inclusivity);
        setCreatedAt(review.createdAt);
        setUpdatedAt(review.updatedAt);
        setAttachmentIds(review.fileIds);
        getUserById(review.authorId).then((user) => {
            setAuthor(user);
        });
    }, [review]);

    return (
        <div
            className="w-full h-fit flex flex-col justify-start items-start gap-2 duration-300
            bg-neutral-100 rounded-lg p-4 hover:outline-usc-gold-light hover:outline-2 transition-all">
            <div className="w-full h-fit flex flex-row justify-between items-end">
                <div className="w-fit h-fit flex flex-col gap-1">
                    <div className="w-fit h-fit text-gray-900 text-2xl font-bold font-roboto">
                        {title}
                    </div>
                    <div className="w-fit h-fit text-gray-900 text-md font-roboto">
                        {author?.name ? author.name : author?.username}
                    </div>
                </div>
                <div className="w-fit h-fit text-gray-900 text-md font-roboto">
                    {updatedAt
                        ? new Date(updatedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                          })
                        : new Date(createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                          })}
                </div>
            </div>
            <div className="w-full h-0.5 bg-gray-300 mb-1" />

            <div className="w-full h-fit grid grid-cols-3 grid-rows-2 grid-flow-col gap-2">
                <RatingItem rating={activitiesRating} title="Activities" />
                <RatingItem rating={leadershipRating} title="Leadership" />
                <RatingItem rating={communityRating} title="Community" />
                <RatingItem rating={inclusivityRating} title="Inclusivity" />
                <RatingItem rating={overallRating} title="Overall" />
            </div>

            <div className="w-full h-0.5 bg-gray-300 mb-1 mt-1" />
            <div className="w-full h-fit text-gray-900 text-md font-roboto">
                <Markdown>{content}</Markdown>
            </div>
            {attachmentIds.length > 0 && (
                <div
                    className="w-full h-fit mt-2 p-2 border-2 border-gray-300 flex flex-row justify-start items-center gap-2
                    rounded-lg bg-neutral-50 overflow-x-auto">
                    {attachmentIds.map((attachmentId, index) => (
                        <AttachmentItem
                            key={attachmentId}
                            index={index}
                            attachmentId={attachmentId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function RatingItem({ rating, title }: { rating: number; title: string }) {
    return (
        <div
            className="w-full h-fit flex flex-row justify-start items-start gap-1 px-2 py-1 bg-gray-50 rounded-lg
            outline outline-gray-300">
            <div className="w-full h-fit text-gray-900 text-md font-roboto">
                {title}
            </div>
            <div className="w-full h-fit text-gray-900 text-md font-roboto flex flex-row justify-end items-start">
                {[...Array(rating)].map((_, index) => (
                    <div
                        key={index}
                        className="w-fit h-fit text-usc-gold text-md font-roboto">
                        ★
                    </div>
                ))}
                {[...Array(5 - rating)].map((_, index) => (
                    <div
                        key={index}
                        className="w-fit h-fit text-usc-gold text-md font-roboto">
                        ☆
                    </div>
                ))}
            </div>
        </div>
    );
}
