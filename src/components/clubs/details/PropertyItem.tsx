export default function PropertyItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div
            className="w-full h-fit flex flex-row justify-between items-center
            bg-neutral-50 rounded-lg p-4 hover:outline-2 hover:outline-usc-gold-light transition-all duration-200">
            <div className="text-gray-900 text-xl font-bold font-roboto">
                {label}
            </div>
            <div className="text-gray-800 text-lg font-semibold font-roboto">
                {value}
            </div>
        </div>
    );
}
