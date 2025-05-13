"use client";

import NavBar from "@/components/NavBar";
import { useParams } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { getUserId, updateUser } from "@/utilities/Fetcher";
import Markdown from "react-markdown";
import StatsItem from "@/components/users/StatsItem";
import ClubItem from "@/components/users/ClubItem";
import ReviewItem from "@/components/users/ReviewItem";

import {
    getClubsByUserId,
    getCommentsByUserId,
    getReviewsByUserId,
    getUserById,
} from "@/utilities/getters";

enum UserYear {
    Freshman = "Freshman",
    Sophomore = "Sophomore",
    Junior = "Junior",
    Senior = "Senior",
    Master = "Master",
    Doctor = "Doctor",
    Unknown = "Unknown",
}

export default function UserPage() {
    const params = useParams();
    const userId = params.id as string;

    const [forceUpdate, setForceUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (userId) {
            getUserById(userId).then((user) => {
                setUser(user);
                setForceUpdate(false);
            });
        }
    }, [userId, forceUpdate]);

    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profileImageId, setProfileImageId] = useState<FileId | null>(null);
    const [bio, setBio] = useState<string>("");
    const [year, setYear] = useState<UserYear>(UserYear.Unknown);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<
        string | null
    >(null);

    const [clubs, setClubs] = useState<Organization[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comments, setComments] = useState<ClubComment[]>([]);

    const [isSelf, setIsSelf] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setName(user.name ?? "");
            setEmail(user.email);

            if (user.profileImageId) {
                setProfileImageId(user.profileImageId);
            }
            setBio(user.bio ?? "");
            setYear((user.year as unknown as UserYear) ?? UserYear.Unknown);

            getUserId().then((currentUserId) => {
                if (currentUserId === user.id) {
                    setIsSelf(true);
                }
            });

            getClubsByUserId(user.id).then((organizations) => {
                setClubs(organizations);
            });

            getReviewsByUserId(user.id).then((reviews) => {
                setReviews(reviews);
            });

            getCommentsByUserId(user.id).then((fetchedComments) => {
                setComments(fetchedComments);
            });
        }
    }, [user]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            setProfileImagePreview(URL.createObjectURL(file));
        } else {
            setProfileImageFile(null);
            setProfileImagePreview(null);
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("year", year);
        if (profileImageFile) {
            formData.append("profileImage", profileImageFile);
        }

        updateUser(formData).then(() => {
            setForceUpdate(true);
        });

        setIsEditing(false);
        setProfileImageFile(null);
        setProfileImagePreview(null);

        if (userId) {
            getUserById(userId).then((updatedUser) => {
                setUser(updatedUser);
            });
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
            setProfileImagePreview(null);
            setProfileImageFile(null);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col justify-start items-center bg-neutral-100 gap-4">
            <NavBar displayProfileCard={true} />
            <div
                className="w-full max-w-1/2 h-full flex flex-col justify-start items-center bg-white
                py-8 px-8 rounded-xl gap-2 mb-4">
                <div className="w-full h-fit flex flex-row justify-between items-end gap-2">
                    {isSelf && (
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            className="w-fit h-fit px-4 py-1 text-white text-md font-semibold font-roboto text-center
                            bg-usc-cardinal-red rounded-lg outline outline-gray-300 hover:outline-2
                            hover:outline-usc-gold-light transition-all duration-300 hover:bg-usc-cardinal-light">
                            {isEditing ? "Save" : "Edit"}
                        </button>
                    )}
                    <div className="Profile w-full flex flex-row justify-end items-center gap-4">
                        <div className="flex flex-col justify-end items-start gap-1">
                            <div className="w-full h-fit flex flex-col justify-end items-end">
                                <div className="text-gray-900 text-2xl font-semibold font-roboto">
                                    @{username}
                                </div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="text-gray-900 text-base font-semibold font-roboto rounded-md px-1 text-end
                                        focus:outline-usc-gold-light focus:outline-2 transition-all duration-300
                                        outline-gray-300 outline-1"
                                        placeholder="Your Name"
                                    />
                                ) : (
                                    <div className="text-gray-900 text-base font-semibold font-roboto">
                                        {name}
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-fit text-end text-gray-900 text-sm font-base font-roboto">
                                {email} |{" "}
                                {isEditing ? (
                                    <select
                                        value={year}
                                        onChange={(e) =>
                                            setYear(e.target.value as UserYear)
                                        }
                                        className="text-gray-900 text-sm font-base font-roboto rounded-md px-1
                                        focus:outline-usc-gold-light focus:outline-2 transition-all duration-300
                                        outline-gray-300 outline-1"
                                        aria-label="Select Year">
                                        {Object.values(UserYear).map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    year
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src={
                                    isEditing && profileImagePreview
                                        ? profileImagePreview
                                        : profileImageId
                                        ? `http://localhost:8080/files/${profileImageId}`
                                        : "/default-profile.svg"
                                }
                                alt="Profile Image"
                                width={80}
                                height={80}
                                className="w-16 h-16 rounded-full outline-2 outline-gray-300
                                hover:outline-usc-gold-light hover:outline-4 transition-all duration-200"
                            />
                            {isEditing && (
                                <label
                                    htmlFor="profileUpload"
                                    className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-1 cursor-pointer hover:bg-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    <input
                                        aria-label="Upload Profile Image"
                                        id="profileUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full h-0.5 bg-gray-200" />

                <div className="w-full h-fit flex flex-col justify-start items-center gap-2 mt-4">
                    <div className="w-full h-fit flex flex-row justify-start items-center gap-2">
                        <div className="w-full max-w-2/3 h-fit text-gray-900 text-3xl text-start font-bold font-roboto">
                            Bio
                        </div>
                        <div className="w-full max-w-1/3 h-fit text-gray-900 text-3xl text-end font-bold font-roboto">
                            Stats
                        </div>
                    </div>

                    <div className="w-full h-fit flex flex-row justify-between items-start gap-2">
                        <div
                            className="w-full max-w-2/3 min-h-[100px] h-full bg-neutral-50 rounded-lg p-4 flex flex-col
                        justify-center items-center hover:outline-usc-gold-light hover:outline-2 transition-all duration-300">
                            {isEditing ? (
                                <>
                                    <label
                                        htmlFor="bioEdit"
                                        className="sr-only">
                                        Edit Bio
                                    </label>
                                    <textarea
                                        id="bioEdit"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full h-full min-h-[80px] text-gray-900 text-base font-base 
                                        font-roboto rounded-lg p-2 resize-none focus:outline-usc-gold-light focus:outline-2
                                        transition-all duration-300 outline-gray-300 outline-1"
                                        aria-label="Edit Bio"
                                        placeholder="Write your bio here..."
                                    />
                                </>
                            ) : bio ? (
                                <div className="w-full prose max-w-none">
                                    <Markdown>{bio}</Markdown>
                                </div>
                            ) : (
                                <div className="w-full h-fit text-gray-900 text-base text-center font-base font-roboto">
                                    No bio written yet
                                </div>
                            )}
                        </div>

                        <div className="w-0.5 h-full self-stretch bg-gray-400" />

                        <div className="w-full max-w-1/4 h-fit flex flex-col justify-start items-end gap-2">
                            <StatsItem label="Clubs" value={clubs.length} />
                            <StatsItem label="Reviews" value={reviews.length} />
                            <StatsItem
                                label="Comments"
                                value={comments.length}
                            />
                        </div>
                    </div>
                </div>

                <div className="Clubs w-full h-fit flex flex-col justify-start items-center gap-2">
                    <div className="w-full h-fit text-gray-900 text-3xl text-start font-bold font-roboto">
                        Clubs
                    </div>

                    <div
                        className="w-full h-fit max-h-[300px] flex flex-row justify-start items-center gap-2 bg-gray-100
                        rounded-lg p-4 overflow-y-auto hover:outline-usc-gold-light hover:outline-2 transition-all duration-300">
                        {clubs.length > 0 ? (
                            clubs.map((club) => (
                                <ClubItem key={club.id} club={club} />
                            ))
                        ) : (
                            <div className="w-full h-fit text-gray-900 text-base text-center font-base font-roboto">
                                No clubs joined yet
                            </div>
                        )}
                    </div>
                </div>

                <div className="Reviews w-full h-fit flex flex-col justify-start items-center gap-2">
                    <div className="w-full h-fit text-gray-900 text-3xl text-start font-bold font-roboto">
                        Reviews
                    </div>

                    <div
                        className="w-full h-fit max-h-[450px] flex flex-row justify-start items-center gap-2 bg-gray-100
                        rounded-lg p-4 overflow-y-auto hover:outline-usc-gold-light hover:outline-2 transition-all duration-300">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewItem key={review.id} review={review} />
                            ))
                        ) : (
                            <div className="w-full h-fit text-gray-900 text-base text-center font-base font-roboto">
                                No reviews written yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
