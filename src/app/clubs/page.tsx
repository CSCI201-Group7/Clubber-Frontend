import NavBar from "@/components/NavBar";
import Clubs from "@/components/clubs/Clubs";

export default function ClubsPage() {
    return (
        <div className="flex flex-1 flex-col h-full w-full relative bg-neutral-100 justify-start items-center">
            <NavBar displayProfileCard={true} />

            <div className="flex flex-col items-center justify-center w-full max-w-1/2 h-full bg-white">
                <Clubs />
            </div>
        </div>
    );
}
