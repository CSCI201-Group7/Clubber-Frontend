type ReviewCardProps = {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const renderRating = (score: number, label: string) => (
        <div className="flex justify-between text-md">
            <span className="text-gray-800">{label}:</span>
            <span className="font-semibold text-amber-400">{'★'.repeat(score)}{'☆'.repeat(5 - score)}</span>
        </div>
    );

    return (
        <div className="bg-gray-50 p-4 my-4 w-4/6 mx-auto">
            <div className="flex justify-between mb-1">
                <h2 className="text-xl font-bold text-gray-800">{review.title}</h2>
                <h2 className="text-md font-bold text-gray-800">{review.createdAt.toLocaleDateString()}</h2>
            </div>
            <div className="text-left">
                     <span className="text-xl text-amber-400">
                        {'★'.repeat(Math.round(review.rating.overall))}
                        {'☆'.repeat(5 - Math.round(review.rating.overall))}
                     </span>
                     <span className="block text-xs text-gray-500 mb-3">Overall</span>
            </div>

            <p className="text-gray-700 mb-3">{review.content}</p>

            <div className="bg-gray-100 grid grid-cols-2 gap-x-5 gap-y-4 mb-3 p-2  ">
                {renderRating(review.rating.activities, "Activities")}
                {renderRating(review.rating.leadership, "Leadership")}
                {renderRating(review.rating.community, "Community")}
                {renderRating(review.rating.inclusivity, "Inclusivity")}
            </div>

            <div className="flex justify-between text-sm text-gray-500">
                <div>
                    <span>Upvotes: {review.upvotes.length}</span> | <span>Downvotes: {review.downvotes.length}</span>
                </div>
                <div>
                <span>Views: {review.views}</span>
                </div>
            </div>
        </div>
    );
}
