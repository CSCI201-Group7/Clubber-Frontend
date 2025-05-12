export default function StatsItem({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div
            className="w-full h-fit flex flex-row justify-between items-center gap-2 py-2 px-4
            bg-neutral-100 rounded-lg hover:outline-2 hover:outline-usc-gold-light transition-all duration-300">
            <div className="w-full h-fit text-gray-900 text-sm text-start font-base font-roboto">
                {label}
            </div>
            <div className="w-full h-fit text-gray-900 text-sm text-end font-base font-roboto">
                {value}
            </div>
        </div>
    );
}
