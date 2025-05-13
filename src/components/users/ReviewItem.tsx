"use client";

import { getClubById, getUserById } from "@/utilities/getters";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReviewCard({ review }: { review: Review }) {
    const router = useRouter();
    const [title, setTitle] = useState(review.title);
    const [date, setDate] = useState(
        new Date(review.createdAt).toLocaleDateString()
    );
    const [overallRating, setOverallRating] = useState(review.rating.overall);
    const [activitiesRating, setActivitiesRating] = useState(
        review.rating.activities
    );
    const [leadershipRating, setLeadershipRating] = useState(
        review.rating.leadership
    );
    const [communityRating, setCommunityRating] = useState(
        review.rating.community
    );
    const [inclusivityRating, setInclusivityRating] = useState(
        review.rating.inclusivity
    );
    const [authorId, setAuthorId] = useState(review.authorId);
    const [organizationId, setOrganizationId] = useState(review.organizationId);

    const [authorProfileImage, setAuthorProfileImage] = useState<string>(
        "/default-profile.svg"
    );
    const [authorName, setAuthorName] = useState<string>("Unknown");
    const [organization, setOrganization] = useState<Organization | null>(null);

    const [clubProfileImage, setClubProfileImage] =
        useState<string>("/Logo.svg");

    useEffect(() => {
        setTitle(review.title);
        setDate(new Date(review.createdAt).toLocaleDateString());
        setOverallRating(review.rating.overall);
        setActivitiesRating(review.rating.activities);
        setLeadershipRating(review.rating.leadership);
        setCommunityRating(review.rating.community);
        setInclusivityRating(review.rating.inclusivity);
        setAuthorId(review.authorId);
        setOrganizationId(review.organizationId);
    }, [review]);

    useEffect(() => {
        const fetchAuthor = async () => {
            const author = await getUserById(authorId);
            if (author) {
                if (author.name) {
                    setAuthorName(author.name);
                } else {
                    setAuthorName(author.username);
                }
                if (author.profileImageId) {
                    setAuthorProfileImage(
                        `http://localhost:8080/files/${author.profileImageId}`
                    );
                }
            }
        };
        fetchAuthor();
    }, [authorId]);

    useEffect(() => {
        const fetchOrganization = async () => {
            const organization = await getClubById(organizationId);
            setOrganization(organization);
            if (organization?.profileImageId) {
                setClubProfileImage(
                    `http://localhost:8080/files/${organization.profileImageId}`
                );
            }
        };
        fetchOrganization();
    }, [organizationId]);
    return (
        <div
            onClick={() => router.push(`/clubs/details/${organizationId}`)}
            className="w-full h-fit bg-neutral-50 p-4 flex flex-col justify-start items-start gap-2
            rounded-lg outline outline-gray-300 hover:outline-usc-gold-light hover:outline-2 transition-all">
            <div className="w-full h-fit flex flex-row justify-between items-end gap-2">
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="text-2xl font-bold text-gray-800">
                        {title}
                    </div>
                    <div className="w-fit h-fit flex flex-row justify-start items-end gap-2">
                        <Link href={`/users/${authorId}`} className="flex flex-row items-end gap-2">
                            <Image
                                className="w-6 h-6 rounded-full object-cover outline outline-gray-300
                                hover:outline-usc-gold-light hover:outline-2 transition-all"
                                src={authorProfileImage}
                                alt={authorName}
                                width={24}
                                height={24}
                            />
                            <div className="text-md font-semibold text-gray-800">
                                {authorName}
                            </div>
                        </Link>
                        <div className="text-sm text-gray-500">{date}</div>
                    </div>
                </div>

                <div className="w-fit h-fit flex flex-row justify-start items-center gap-2">
                    <div className="text-lg font-semibold text-gray-900">
                        {organization?.name}
                    </div>
                    <Image
                        className="w-10 h-10 rounded-full object-cover outline outline-gray-300
                        hover:outline-usc-gold-light hover:outline-2 transition-all"
                        src={clubProfileImage}
                        alt={organization?.name ?? ""}
                        width={32}
                        height={32}
                    />
                </div>
            </div>

            <div className="w-full h-0.5 bg-gray-300" />

            <div className="w-full h-fit grid grid-cols-3 grid-rows-2 grid-flow-col gap-2">
                <RatingItem rating={activitiesRating} title="Activities" />
                <RatingItem rating={leadershipRating} title="Leadership" />
                <RatingItem rating={communityRating} title="Community" />
                <RatingItem rating={inclusivityRating} title="Inclusivity" />
                <RatingItem rating={overallRating} title="Overall" />
            </div>

            <div className="w-full h-0.5 bg-gray-300" />

            <div className="w-full h-fit max-h-[200px] overflow-hidden text-ellipsis">
                <Markdown>{review.content}</Markdown>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
                <div>
                    <span>Upvotes: {review.upvotes.length}</span> |{" "}
                    <span>Downvotes: {review.downvotes.length}</span>
                </div>
            </div>
        </div>
    );
}

function RatingItem({ rating, title }: { rating: number; title: string }) {
    return (
        <div
            className="w-full h-fit flex flex-row justify-start items-start gap-1 px-2 py-1 bg-gray-50 rounded-lg
            outline outline-gray-300 hover:outline-usc-gold-light hover:outline-2 transition-all">
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
