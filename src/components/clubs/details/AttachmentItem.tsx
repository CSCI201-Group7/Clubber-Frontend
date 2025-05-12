"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AttachmentItem({
    index,
    attachmentId,
}: {
    index: number;
    attachmentId: FileId;
}) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");
    useEffect(() => {
        if (attachmentId) {
            fetch(`http://localhost:8080/files/meta/${attachmentId}`).then(
                async (response) => {
                    if (response.ok) {
                        const metadata = await response.json();
                        setObjectUrl(
                            `http://localhost:8080/files/${attachmentId}`
                        );
                        setIsImage(metadata.contentType.startsWith("image/"));
                        setFileName(metadata.filename);
                    }
                }
            );
        }
    }, [attachmentId]);

    if (!objectUrl) {
        return (
            <div className="w-fit h-fit text-gray-800 text-sm font-roboto animate-pulse">
                Loading attachment...
            </div>
        );
    }

    return (
        <div
            key={index}
            className=" text-gray-800 text-sm font-roboto border border-gray-300 rounded-md h-fit w-fit
            hover:outline-usc-gold-light hover:outline-3 hover:-outline-offset-2 transition-all duration-300">
            {isImage && (
                <Link
                    href={objectUrl}
                    download={fileName}
                    className="group relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={objectUrl}
                        alt={fileName}
                        className="object-cover rounded-lg"
                        width={250}
                        height={250}
                    />
                </Link>
            )}
            {!isImage && (
                <a
                    href={objectUrl}
                    download={fileName}
                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-150 my-2 mx-4">
                    Download {fileName}
                </a>
            )}
        </div>
    );
}
