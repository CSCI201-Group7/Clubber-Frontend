import ClubCard from "./ClubCard";

export default function MyClubs({
    myClubs,
    isMyClubEmpty,
}: {
    myClubs: Organization[];
    isMyClubEmpty: boolean;
}) {
    return (
        <>
            <div className="text-4xl font-bold font-roboto text-black">
                My Clubs
            </div>
            <div
                className="w-full h-fit p-4 flex flex-row justify-start items-start gap-4 bg-gray-100 rounded-lg
                px-4 py-4 overflow-x-auto">
                {isMyClubEmpty ? (
                    <div className="text-gray-600 text-2xl font-semibold font-roboto">
                        Join a club to get started!
                    </div>
                ) : (
                    <div className="flex flex-row justify-start items-start gap-3">
                        {myClubs.map((club) => (
                            <ClubCard key={club.id} club={club} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
