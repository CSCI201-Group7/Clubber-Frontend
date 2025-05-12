export default function CommentItem({ comment }: { comment: ClubComment }) {
    return (
        <div className="w-full h-fit flex flex-row justify-start items-center gap-2 bg-gray-100
            rounded-lg p-4 overflow-y-auto hover:outline-usc-gold-light hover:outline-2 transition-all duration-300">
            <div className="w-full h-fit text-gray-900 text-base text-center font-base font-roboto">
                {comment.text}
            </div>
        </div>
    );
}
