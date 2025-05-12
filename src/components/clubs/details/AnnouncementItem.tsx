"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { getUserById } from "@/utilities/getters";
import AttachmentItem from "./AttachmentItem";

export default function AnnouncementItem({
    announcement,
}: {
    announcement: Announcement;
}) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [updatedAt, setUpdatedAt] = useState<string>("");
    const [authorId, setAuthorId] = useState<string>("");
    const [attachmentIds, setAttachmentIds] = useState<FileId[]>([]);
    const [author, setAuthor] = useState<string>("anonymous");

    const [hasAttachments, setHasAttachments] = useState<boolean>(false);

    useEffect(() => {
        setTitle(announcement.title);
        setContent(announcement.content);
        setCreatedAt(announcement.createdAt.toLocaleString());
        setUpdatedAt(announcement.updatedAt.toLocaleString());
        setAuthorId(announcement.authorId);
        setAttachmentIds(announcement.attachmentIds);
        setHasAttachments(announcement.attachmentIds.length > 0);
    }, [announcement]);

    useEffect(() => {
        if (authorId) {
            getUserById(authorId).then((user) => {
                setAuthor(user.username);
            });
        }
    }, [authorId]);

    return (
        <div
            className="w-full h-fit flex flex-col justify-start items-start gap-2 
            bg-neutral-100 rounded-lg p-4 hover:outline-usc-gold-light hover:outline-2 
            hover:outline-offset-1 transition-all duration-300">
            <div className="w-full h-fit flex flex-row justify-between items-center gap-2">
                <div className="w-full h-fit flex flex-col justify-start items-center gap-1">
                    <div className="w-full h-fit text-black text-2xl font-semibold font-roboto">
                        {title}
                    </div>
                    <div className="w-full h-fit text-gray-800 text-md font-roboto">
                        {author}
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col justify-start items-end gap-1">
                    <TimeStampItem label="Created" time={createdAt} />
                    <TimeStampItem label="Updated" time={updatedAt} />
                </div>
            </div>
            <div className="w-full h-0.5 bg-gray-300 mb-1" />

            <div className="w-full h-fit text-gray-800 text-xl font-roboto">
                <Markdown>{content}</Markdown>
            </div>
            {hasAttachments && (
                <div className="w-full h-fit mt-2 p-2 border-2 border-gray-300 flex flex-row justify-start items-center gap-2
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

function TimeStampItem({ label, time }: { label: string; time: string }) {
    return (
        <div className="w-fit h-fit text-gray-800 text-sm font-roboto">
            {label}: {new Date(time).toLocaleString()}
        </div>
    );
}
