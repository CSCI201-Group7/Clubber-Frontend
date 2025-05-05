"use client";

import { useSearchParams } from "next/navigation";
import ClubRecommendationItem from "@/components/home/ClubRecommendationItem";
import EventItem from "@/components/home/EventItem";
import ReviewItem from "@/components/home/ReviewItem";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ClubPage() {
  const searchParams = useSearchParams();
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isRating, setIsRating] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const clubName = searchParams.get("name") || "Unknown Club";
  const category = searchParams.get("category") || "No Category";
  const events = JSON.parse(searchParams.get("events") || "[]");
  const description =
    searchParams.get("description") || "No description available";
  const logo = searchParams.get("logo") || "/anon.png";
  const rating = parseInt(searchParams.get("rating") || "0", 10);
  const reviews = JSON.parse(searchParams.get("reviews") || "[]");

  const handleRatingClick = (selectedRating: number) => {
    setUserRating(selectedRating);
    setIsRating(true);
  };

  const handleSubmitReview = () => {
    // TODO: Add API call to submit review
    console.log({
      rating: userRating,
      title: reviewTitle,
      content: reviewContent,
    });
    // Reset form
    setUserRating(null);
    setReviewTitle("");
    setReviewContent("");
    setIsRating(false);
  };

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="NavBar w-full h-fit flex flex-row justify-between items-center bg-usc-cardinal-red px-3 py-1.5">
        <Link href="/" className="w-fit h-fit px-2.5 py-1.5">
          <Image
            className="w-40 h-20 mx-auto"
            src="/assets/PrimaryMono-Gold.png"
            alt="USC Logo"
            width={80}
            height={40}
          />
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="/discover" className="text-white hover:text-gray-300">
            Discover
          </Link>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
        </div>
      </div>

      <div className="BodySection w-full max-w-2/3 h-fit flex-1 flex flex-col justify-start pt-5 bg-white overflow-y-scroll px-4 py-2">
        <div className="flex flex-row justify-start">
          <div className="w-[200px] h-[200px] rounded-full border border-black flex justify-center items-center m-4">
            <Image
              src={logo}
              alt="Club Logo"
              layout="fixed"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <div className="ClubOverview w-auto h-fit flex flex-col justify-start items-start gap-4 p-4">
            <div className="text-[42px] font-roboto font-bold text-start text-black">
              {clubName}
            </div>
            <div className="text-lg text-gray-600 flex flex-col gap-2">
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {Array.from({ length: rating }, (_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: 5 - rating }, (_, i) => (
                  <span key={i}>☆</span>
                ))}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setIsRating(!isRating)}
                  className="bg-usc-cardinal-red text-white px-4 py-2 rounded hover:bg-red-800 transition-colors"
                >
                  {isRating ? "Cancel Review" : "Write a Review"}
                </button>
                {isRating && (
                  <div className="mt-4 flex flex-col gap-4 w-full max-w-md">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          className={`text-2xl hover:scale-110 transition-transform ${
                            userRating && star <= userRating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Review Title"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-usc-cardinal-red"
                    />
                    <textarea
                      placeholder="Write your review here..."
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-usc-cardinal-red resize-none"
                    />
                    <button
                      onClick={handleSubmitReview}
                      disabled={!userRating || !reviewTitle || !reviewContent}
                      className="bg-usc-cardinal-red text-white px-6 py-2 rounded hover:bg-red-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-black">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{review.title}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rate ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        {i < review.rate ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.reviewDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
