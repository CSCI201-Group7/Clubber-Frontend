"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import AttachmentItem from "./AttachmentItem";
import Link from "next/link";

export default function EventItem({ event }: { event: Event }) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [rsvpLink, setRsvpLink] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [attachmentIds, setAttachmentIds] = useState<FileId[]>([]);
    const [hasAttachments, setHasAttachments] = useState<boolean>(false);

    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        setTitle(event.title);
        setDescription(event.description);
        setRsvpLink(event.rsvpLink);
        setLocation(event.location);
        setStartTime(
            new Date(event.startTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            })
        );
        setEndTime(
            new Date(event.endTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            })
        );
        setAttachmentIds(event.attachmentIds);
        setHasAttachments(event.attachmentIds.length > 0);
    }, [event]);

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            className={`w-full h-fit px-8 py-4 flex flex-col justify-start items-start gap-2 
            bg-neutral-100 rounded-lg hover:outline-usc-gold-light hover:outline-2
            transition-all duration-300 ${
                expanded ? `outline-2 outline-usc-gold-light max-h-[450px]` : ""
            }`}>
            <div className="w-full h-fit flex flex-row justify-between items-end gap-2">
                <div className="w-fit h-fit flex flex-col justify-start items-start">
                    <div className="text-gray-900 text-2xl font-bold font-roboto">
                        {title}
                    </div>
                    <div className="text-gray-600 text-md font-semibold font-roboto">
                        {location}
                    </div>
                </div>

                <div className="text-gray-900 text-md font-normal font-roboto flex flex-col justify-end items-end">
                    <div>{startTime}</div>
                    <div>{endTime}</div>
                </div>
            </div>
            <div className="w-full h-0.5 bg-gray-300 mb-4 flex flex-col justify-start items-start gap-2" />
            <div className="w-full h-fit flex flex-col justify-start items-start gap-2 overflow-hidden text-ellipsis">
                <Markdown>{description}</Markdown>
            </div>
            {hasAttachments && expanded && (
                <div className="w-full h-fit flex flex-row justify-start items-start gap-2 overflow-x-auto">
                    {attachmentIds.map((attachmentId, index) => (
                        <AttachmentItem
                            key={index}
                            index={index}
                            attachmentId={attachmentId}
                        />
                    ))}
                </div>
            )}
            <div className="w-full h-fit flex flex-row justify-end items-end">
                <Link
                    href={rsvpLink}
                    className="w-fit h-fit py-2 px-5 bg-usc-cardinal-red rounded-md
                    hover:bg-usc-cardinal-red-light transition-all duration-300
                    hover:outline-usc-gold-light hover:outline-4">
                    <div className="w-full h-fit text-white text-sm font-semibold font-roboto text-center">
                        Click here to RSVP
                    </div>
                </Link>
            </div>
            <div className="w-full h-fit text-gray-500 text-sm font-normal font-roboto text-center">
                Click to {expanded ? "collapse" : "expand"}
            </div>
        </div>
    );
}
