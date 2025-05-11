import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";

export default function NavBar({
    displayProfileCard,
}: {
    displayProfileCard: boolean;
}) {
    return (
        <div className="NavBar w-full h-fit flex flex-row justify-between items-center bg-usc-cardinal-red px-5 py-2 relative">
            <Link href="/" className="w-fit h-fit px-2.5 py-1.5">
                <Image
                    className="w-40 h-20"
                    src="/assets/PrimaryMono-Gold.png"
                    alt="USC Logo"
                    width={80}
                    height={40}
                />
            </Link>
            {displayProfileCard && <ProfileCard />}
        </div>
    );
}
