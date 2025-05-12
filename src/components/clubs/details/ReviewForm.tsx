import Form from "next/form";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createReview } from "@/utilities/Fetcher";
import { useParams } from "next/navigation";

export default function ReviewForm({
    hidden,
    setHidden,
}: {
    hidden: boolean;
    setHidden: (hidden: boolean) => void;
}) {
    const params = useParams();
    const [communityRating, setCommunityRating] = useState<number>(0);
    const [activitiesRating, setActivitiesRating] = useState<number>(0);
    const [leadershipRating, setLeadershipRating] = useState<number>(0);
    const [inclusivityRating, setInclusivityRating] = useState<number>(0);
    const [overallRating, setOverallRating] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const imageUploadRef = useRef<HTMLInputElement>(null);
    const [organizationId, setOrganizationId] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleSubmit = async (incomingFormData: FormData) => {
        const title = incomingFormData.get("title") as string;
        const content = incomingFormData.get("content") as string;

        const submissionFormData = new FormData();
        submissionFormData.append("organizationId", organizationId);
        if (title) submissionFormData.append("title", title);
        if (content) submissionFormData.append("content", content);

        submissionFormData.append(
            "communityRating",
            communityRating.toString()
        );
        submissionFormData.append(
            "activitiesRating",
            activitiesRating.toString()
        );
        submissionFormData.append(
            "leadershipRating",
            leadershipRating.toString()
        );
        submissionFormData.append(
            "inclusivityRating",
            inclusivityRating.toString()
        );
        submissionFormData.append("overallRating", overallRating.toString());

        selectedImages.forEach((file) => {
            submissionFormData.append("attachments", file, file.name);
        });

        setHidden(true);

        try {
            const response = await createReview(submissionFormData);
            console.log("Review submitted successfully:", response);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, []);

    useEffect(() => {
        setOrganizationId(params.id as string);
    }, [params.id]);

    const handleImageSelection = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newFilesArray = Array.from(files);
            setSelectedImages((prevFiles) => [...prevFiles, ...newFilesArray]);

            const currentFilePreviews: string[] = [];
            let filesProcessed = 0;

            newFilesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                        currentFilePreviews.push(reader.result);
                    }
                    filesProcessed++;
                    if (filesProcessed === newFilesArray.length) {
                        setImagePreviews((prevPreviews) => [
                            ...prevPreviews,
                            ...currentFilePreviews,
                        ]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
        if (event.target) {
            event.target.value = "";
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Form
            className={`w-full h-fit flex flex-col justify-start items-start gap-2
                transition-all duration-500 ${
                    hidden
                        ? "max-h-0 opacity-0 overflow-hidden"
                        : "max-h-fit opacity-100"
                }`}
            action={handleSubmit}
            id="review-form">
            <input
                required
                form="review-form"
                name="title"
                type="text"
                placeholder="Title"
                className="w-full h-10 rounded-lg bg-neutral-50 border-2 border-gray-300 py-2 px-4 
                focus:outline-usc-gold-light focus:outline-2 focus:-outline-offset-2 transition-all 
                duration-300 focus:bg-white ease-in-out"
            />
            <input
                type="file"
                ref={imageUploadRef}
                onChange={handleImageSelection}
                className="hidden"
                accept="image/*"
                multiple
                title="Image Upload"
            />
            <div className="w-full h-0.5 bg-gray-300" />
            <div
                className="w-full px-4 py-2 h-fit gap-y-1 gap-x-3 grid grid-cols-3 grid-rows-2 grid-flow-col
                justify-center items-center content-center">
                <RatingItem
                    label="Community"
                    rating={communityRating}
                    setRating={setCommunityRating}
                />
                <RatingItem
                    label="Activities"
                    rating={activitiesRating}
                    setRating={setActivitiesRating}
                />
                <RatingItem
                    label="Leadership"
                    rating={leadershipRating}
                    setRating={setLeadershipRating}
                />
                <RatingItem
                    label="Inclusivity"
                    rating={inclusivityRating}
                    setRating={setInclusivityRating}
                />
                <RatingItem
                    label="Overall"
                    rating={overallRating}
                    setRating={setOverallRating}
                />
                <div className="w-full h-fit flex flex-row items-center justify-center">
                    <button
                        type="button"
                        onClick={() => imageUploadRef.current?.click()}
                        className="w-fit h-fit flex flex-row items-center justify-center py-2
                            px-4 bg-usc-cardinal-red rounded-lg transition-all duration-300
                            hover:bg-usc-cardinal-light hover:outline-usc-gold-light
                            hover:outline-2 hover:outline-offset-2">
                        <div className="text-sm font-semibold text-white">
                            Upload Images
                        </div>
                    </button>
                </div>
            </div>
            <textarea
                required
                ref={textareaRef}
                form="review-form"
                name="content"
                placeholder="Share your thoughts..."
                onChange={adjustTextareaHeight}
                className="w-full min-h-32 max-h-64 h-fit rounded-lg bg-neutral-50 border-2 border-gray-300 py-2 px-4 
                focus:outline-usc-gold-light focus:outline-2 focus:-outline-offset-2 transition-all 
                duration-300 focus:bg-white ease-in-out resize-none overflow-auto"
            />
            {imagePreviews.length > 0 && (
                <div className="w-full h-fit mt-2 p-2 border-2 border-gray-300 rounded-lg bg-neutral-50">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {imagePreviews.map((preview, index) => (
                            <ImagePreview
                                key={index}
                                index={index}
                                image={preview}
                                onRemove={() => handleRemoveImage(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <button
                type="submit"
                form="review-form"
                className="w-full h-10 rounded-lg bg-usc-cardinal-red text-white font-semibold 
                hover:bg-usc-cardinal-light transition-all duration-300 mt-2
                hover:outline-usc-gold-light hover:outline-3 hover:outline-offset-2">
                Submit Review
            </button>
        </Form>
    );
}

function RatingItem({
    label,
    rating,
    setRating,
}: {
    label: string;
    rating: number;
    setRating: (rating: number) => void;
}) {
    const [hoverRating, setHoverRating] = useState<number>(0);

    const isFilled = (value: number) => {
        const currentDisplayRating = hoverRating > 0 ? hoverRating : rating;
        return currentDisplayRating >= value;
    };

    return (
        <div className="w-full flex flex-row items-center justify-between bg-gray-100 rounded-lg p-2">
            <div className="text-sm font-medium text-gray-700">{label}</div>
            <div
                className="flex items-center text-2xl text-gray-300"
                onMouseLeave={() => setHoverRating(0)}>
                {[...Array(5)].map((_, starIndex) => {
                    const value = starIndex + 1;
                    return (
                        <div
                            key={starIndex}
                            className="relative flex cursor-pointer">
                            <div
                                className={`w-fit overflow-hidden ${
                                    isFilled(value) ? "text-usc-gold" : ""
                                }`}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoverRating(value)}>
                                ★
                            </div>
                            <div className="absolute top-0 left-0 -z-10">☆</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ImagePreview({
    index,
    image,
    onRemove,
}: {
    index: number;
    image: string;
    onRemove: () => void;
}) {
    return (
        <div
            key={index}
            className="group relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
                src={image}
                alt={`Preview ${index + 1}`}
                className="rounded-lg object-cover"
                fill
            />
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-1 right-1 w-fit h-fit z-10 bg-white bg-opacity-60 
                p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md 
                hover:outline-usc-gold-light hover:outline-2 flex items-center justify-center"
                aria-label="Remove image preview">
                <Image
                    src="/assets/clubs/details/delete.svg"
                    alt="Delete"
                    width={13}
                    height={13}
                    className="w-4 h-4 relative"
                />
            </button>
        </div>
    );
}
