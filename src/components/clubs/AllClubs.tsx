import ClubItem from "./ClubItem";

export default function AllClubs({
    allClubs,
    isAllClubEmpty,
}: {
    allClubs: Organization[];
    isAllClubEmpty: boolean;
}) {
    return (
        <>
            <div className="text-4xl font-bold font-roboto text-black">
                All Clubs
            </div>
            <div
                className="w-full flex-1 flex flex-row justify-start items-start gap-4 bg-gray-100 rounded-lg
                p-4 overflow-x-auto overflow-y-auto">
                {isAllClubEmpty ? (
                    <div className="text-gray-600 text-2xl font-semibold font-roboto">
                        No clubs found
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col justify-start items-start gap-3 overflow-y-auto p-1">
                        {allClubs.map((club) => (
                            <ClubItem key={club.id} club={club} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
