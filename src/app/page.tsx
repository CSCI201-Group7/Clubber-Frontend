import ClubRecommendationItem from "@/components/home/ClubRecommendationItem";
import EventItem from "@/components/home/EventItem";
import ReviewItem from "@/components/home/ReviewItem";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center">
            <div className="NavBar w-full h-fit flex flex-row justify-between items-center bg-usc-cardinal-red px-3 py-1.5">
                <Link href="/" className="w-fit h-fit px-2.5 py-1.5">
                    <Image
                        className="w-40 h-20"
                        src="/assets/PrimaryMono-Gold.png"
                        alt="USC Logo"
                        width={80}
                        height={40}
                    />
                </Link>
            </div>
            <div className="BodySection w-full max-w-2/3 h-full flex-1 flex flex-col justify-start items-center bg-white overflow-y-scroll px-4 py-2">
                <div className="ClubRecommendation w-full h-fit flex flex-col justify-start items-start gap-2 p-2">
                    <div className="text-[42px] font-roboto font-bold text-start text-black">
                        Clubs
                    </div>
                    <div className="ClubRecommendationItem w-full h-fit flex flex-row justify-start items-start gap-2 overflow-x-scroll">
                        {/* TODO: Add club recommendation items */}
                        <ClubRecommendationItem />
                    </div>
                </div>
                <div className="ReviewAndEvents w-full h-full flex flex-row justify-between items-start gap-2 p-2">
                    <div className="Reviews w-full flex-1 h-full flex flex-col justify-start items-start gap-2">
                        <div className="text-[42px] font-roboto font-bold text-start text-black">
                            Reviews
                        </div>
                        <div className="ReviewItem w-2/3 h-fit flex flex-row justify-start items-start gap-2">
                            {/* TODO: Add review items */}
                            <ReviewItem />
                        </div>
                    </div>
                    <div className="Events w-1/3 flex-1 h-full flex flex-col justify-start items-start gap-2">
                        <div className="text-[42px] font-roboto font-bold text-start text-black">
                            Events
                        </div>
                        <div className="EventItem w-full h-fit flex flex-row justify-start items-start gap-2">
                            {/* TODO: Add event items */}
                            <EventItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
