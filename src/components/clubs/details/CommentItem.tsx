"use client";

import { useEffect, useState } from "react";

export default function CommentItem({ comment }: { comment: ClubComment }) {
    const [content, setContent] = useState<string>(comment.content);
    const [author, setAuthor] = useState<User | null>(null);
    const [createdAt, setCreatedAt] = useState<string>(comment.timeCreated);

    useEffect(() => {
        setContent(comment.content);
        setAuthor(comment.author);
        setCreatedAt(comment.timeCreated);
    }, [comment]);

    return <div>CommentItem</div>;
}
