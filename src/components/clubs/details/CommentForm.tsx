"use client";

import { useState } from "react";
import Image from "next/image";
import { createComment } from "@/utilities/Fetcher";

export default function CommentForm({
    hidden,
    setHidden,
    reviewId,
    parentCommentId,
    setForceUpdate,
}: {
    hidden: boolean;
    setHidden: (hidden: boolean) => void;
    reviewId: string;
    parentCommentId: string;
    setForceUpdate: (forceUpdate: boolean) => void;
}) {
    const [comment, setComment] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const response = await createComment(
            comment,
            reviewId,
            parentCommentId
        );
        if (response) {
            setComment("");
            setHidden(true);
            setForceUpdate(true);
        }

        setIsSubmitting(false);
    };

    return (
        <div
            className={`w-full h-fit flex flex-row justify-start items-start gap-2 p-1 ${
                hidden ? "hidden" : ""
            }`}>
            <textarea
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Add a comment"
                className="w-full h-fit max-h-32 py-2 px-4 text-md font-roboto bg-neutral-50 rounded-lg
                outline-2 outline-gray-300 hover:outline-usc-gold-light transition-all
                focus:outline-usc-gold-light resize-none overflow-hidden"
                rows={1}
            />
            <button
                type="button"
                title="Send"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-fit h-fit p-2 text-md font-roboto bg-neutral-50 rounded-lg
                hover:bg-white transition-all outline-2 outline-gray-400
                hover:outline-usc-gold-light">
                <Image
                    src="/assets/clubs/details/paperplane.svg"
                    alt="Send"
                    width={20}
                    height={20}
                />
            </button>
        </div>
    );
}
