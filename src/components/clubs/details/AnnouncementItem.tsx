"use client";
import { getFiles, getUser } from "@/utilities/Fetcher";
import { randomUUID } from "crypto";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Image from "next/image";

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
    const [attachments, setAttachments] = useState<File[]>([]);
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
            getUser(authorId).then((user) => {
                if (user) {
                    setAuthor(user.username);
                }
            });
        }
    }, [authorId]);

    useEffect(() => {
        if (hasAttachments) {
            getFiles(attachmentIds).then((attachments) => {
                setAttachments(attachments);
            });
        }
    }, [attachmentIds, hasAttachments]);

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
                <div className="w-full h-fit flex flex-row justify-start items-center gap-2 overflow-x-auto">
                    {attachments.map((attachment) => (
                        <AttachmentItem
                            key={randomUUID()}
                            attachment={attachment}
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

function AttachmentItem({ attachment }: { attachment: File }) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    useEffect(() => {
        if (attachment) {
            const url = URL.createObjectURL(attachment);
            setObjectUrl(url);

            return () => {
                URL.revokeObjectURL(url);
                setObjectUrl(null);
            };
        }
    }, [attachment]);

    if (!objectUrl) {
        return (
            <div className="w-fit h-fit text-gray-800 text-sm font-roboto animate-pulse">
                Loading attachment...
            </div>
        );
    }

    const isImage = attachment.type.startsWith("image/");

    return (
        <div className="w-fit h-fit text-gray-800 text-sm font-roboto border border-gray-300 rounded-md p-2">
            {isImage ? (
                <Image
                    src={objectUrl}
                    alt={attachment.name}
                    className="max-w-xs max-h-48 object-contain rounded"
                    width={192}
                    height={192}
                />
            ) : (
                <a
                    href={objectUrl}
                    download={attachment.name}
                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-150">
                    Download {attachment.name}
                </a>
            )}
        </div>
    );
}
