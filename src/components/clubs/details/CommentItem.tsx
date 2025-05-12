"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCommentsByParentCommentId, getUserById } from "@/utilities/getters";
import Markdown from "react-markdown";
import CommentForm from "./CommentForm";
import { downvoteComment, getUserId, upvoteComment } from "@/utilities/Fetcher";

export default function CommentItem({ comment }: { comment: ClubComment }) {
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);
    const [content, setContent] = useState<string>(comment.text);
    const [author, setAuthor] = useState<User | null>(null);
    const [authorName, setAuthorName] = useState<string>("Anonymous");
    const [authorProfilePicture, setAuthorProfilePicture] = useState<string>(
        "/default-profile.svg"
    );
    const [upvotes, setUpvotes] = useState<UserId[]>(comment.upvotes);
    const [downvotes, setDownvotes] = useState<UserId[]>(comment.downvotes);
    const [createdAt, setCreatedAt] = useState<string>(comment.timeCreated);
    const [commentFormHidden, setCommentFormHidden] = useState<boolean>(true);
    const [currentUserId, setCurrentUserId] = useState<UserId | null>(null);

    const [subComments, setSubComments] = useState<ClubComment[]>([]);

    const handleUpvote = () => {
        if (currentUserId && !upvotes.includes(currentUserId)) {
            upvoteComment(comment.id).then(() => {
                setUpvotes([...upvotes, currentUserId]);
                if (downvotes.includes(currentUserId)) {
                    setDownvotes(
                        downvotes.filter((userId) => userId !== currentUserId)
                    );
                }
            });
        } else if (currentUserId && upvotes.includes(currentUserId)) {
            upvoteComment(comment.id, true).then(() => {
                setUpvotes(upvotes.filter((id) => id !== currentUserId));
            });
        }
    };

    const handleDownvote = () => {
        if (currentUserId && !downvotes.includes(currentUserId)) {
            downvoteComment(comment.id).then(() => {
                setDownvotes([...downvotes, currentUserId]);
                if (upvotes.includes(currentUserId)) {
                    setUpvotes(
                        upvotes.filter((userId) => userId !== currentUserId)
                    );
                }
            });
        } else if (currentUserId && downvotes.includes(currentUserId)) {
            downvoteComment(comment.id, true).then(() => {
                setDownvotes(downvotes.filter((id) => id !== currentUserId));
            });
        }
    };

    useEffect(() => {
        setContent(comment.text);
        getUserById(comment.authorId).then((user) => {
            setAuthor(user);
        });
        setUpvotes(comment.upvotes);
        setDownvotes(comment.downvotes);
        setCreatedAt(comment.timeCreated);
        getCommentsByParentCommentId(comment.id).then((comments) => {
            if (comments) {
                setSubComments(comments);
            }
        });
        getUserId().then((userId) => {
            setCurrentUserId(userId as UserId | null);
        });
        setForceUpdate(false);
    }, [comment, forceUpdate]);

    useEffect(() => {
        if (author) {
            if (author.profileImageId && author.profileImageId !== "") {
                setAuthorProfilePicture(
                    `http://localhost:8080/files/${author.profileImageId}`
                );
            }
            setAuthorName(author.name ? author.name : author.username);
        }
    }, [author]);

    return (
        <div
            className="w-full h-fit flex flex-col justify-start items-start gap-2 px-2 py-1 
            bg-neutral-50 rounded-lg outline-2 outline-gray-300 hover:outline-usc-gold-light 
            transition-all duration-300">
            <div className="w-full h-fit flex flex-row justify-between items-center gap-2 p-1">
                <div className="w-fit h-fit flex flex-row justify-start items-center gap-2">
                    <Image
                        className="w-8 h-8 rounded-full outline outline-gray-300 hover:outline-usc-gold-light
                    transition-all duration-300 hover:outline-2"
                        src={authorProfilePicture}
                        alt={authorName}
                        width={25}
                        height={25}
                    />
                    <div className="w-fit h-fit text-gray-900 text-lg font-semibold font-roboto">
                        {authorName}
                    </div>
                </div>
                <div className="w-fit h-fit text-gray-500 text-md font-roboto">
                    {createdAt}
                </div>
            </div>
            <div className="w-full h-fit text-gray-900 text-md font-roboto px-1">
                <Markdown>{content}</Markdown>
            </div>

            <div className="w-full h-fit flex flex-row justify-between items-center gap-4 p-1">
                <div className="w-full h-fit flex flex-row justify-start items-center gap-4 py-1 px-2">
                    <div
                        onClick={handleUpvote}
                        className="Upvotes w-fit h-fit text-gray-900 text-md font-roboto 
                            flex flex-row justify-start items-center gap-1">
                        <Image
                            src={`/assets/clubs/details/arrow-up${upvotes.includes(currentUserId as UserId)
                                ? "-filled"
                                : ""
                                }.svg`}
                            alt="Upvote"
                            width={20}
                            height={20}
                        />
                        <div className="w-fit h-fit text-usc-cardinal-dark text-lg font-semibold font-roboto">
                            {upvotes.length}
                        </div>
                    </div>
                    <div
                        onClick={handleDownvote}
                        className="Downvotes w-fit h-fit text-gray-900 text-md font-roboto 
                            flex flex-row justify-start items-center gap-1">
                        <Image
                            src={`/assets/clubs/details/arrow-down${downvotes.includes(currentUserId as UserId)
                                ? "-filled"
                                : ""
                                }.svg`}
                            alt="Downvote"
                            width={20}
                            height={20}
                        />
                        <div className="w-fit h-fit text-usc-cardinal-dark text-lg font-semibold font-roboto">
                            {downvotes.length}
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit flex flex-row justify-end items-center gap-4 py-1 px-2">
                    <div className="w-fit h-fit text-gray-500 text-md font-roboto">
                        Comments: {subComments.length}
                    </div>

                    <div
                        onClick={() => setCommentFormHidden(!commentFormHidden)}
                        className="w-fit h-fit p-2 text-md font-roboto bg-neutral-50 rounded-lg hover:bg-white
                        outline-2 outline-gray-400 hover:outline-usc-gold-light transition-all">
                        <Image
                            className="w-3 h-3"
                            src="/assets/clubs/details/chat-bubble.svg"
                            alt="Comment"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </div>

            <CommentForm
                hidden={commentFormHidden}
                setHidden={setCommentFormHidden}
                reviewId={""}
                parentCommentId={comment.id}
                setForceUpdate={setForceUpdate}
            />
            {subComments.length > 0 &&
                subComments.map((subComment) => (
                    <CommentItem key={subComment.id} comment={subComment} />
                ))}
        </div>
    );
}
