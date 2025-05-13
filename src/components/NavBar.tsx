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
            <div className="flex flex-row items-center gap-6">
                <Link href="/" className="w-fit h-fit px-2.5 py-1.5">
                    <Image
                        className="w-40 h-20"
                        src="/assets/PrimaryMono-Gold.png"
                        alt="USC Logo"
                        width={80}
                        height={40}
                    />
                </Link>
                <nav className="flex flex-row gap-8">
                    <Link
                        href="/"
                        className="text-white hover:text-usc-gold-light transition-all 
                        duration-200 text-xl font-bold outline outline-gray-300 
                        hover:outline-usc-gold-light hover:outline-2 rounded-lg px-4 py-1
                        hover:bg-usc-cardinal-light">
                        Home
                    </Link>
                    <Link
                        href="/clubs"
                        className="text-white hover:text-usc-gold-light transition-all 
                        duration-200 text-xl font-bold outline outline-gray-300 
                        hover:outline-usc-gold-light hover:outline-2 rounded-lg px-4 py-1
                        hover:bg-usc-cardinal-light">
                        Clubs
                    </Link>
                    <Link
                        href="/clubs/create"
                        className="text-white hover:text-usc-gold-light transition-all 
                        duration-200 text-xl font-bold outline outline-gray-300 
                        hover:outline-usc-gold-light hover:outline-2 rounded-lg px-4 py-1
                        hover:bg-usc-cardinal-light">
                        Create
                    </Link>
                </nav>
            </div>
            {displayProfileCard && <ProfileCard />}
        </div>
    );
}
