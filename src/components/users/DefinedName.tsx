export default function DefinedName({
    name,
    username,
}: {
    name: string;
    username: string;
}) {
    return (
        <div className="w-full h-fit flex flex-row justify-end items-end gap-1">
            <div className="text-gray-900 text-2xl font-bold font-inter">
                {name}
            </div>
            <div className="text-gray-900 text-xl font-semibold font-inter">
                @{username}
            </div>
        </div>
    );
}
