export function Avatar({ name, size = 10 }: { name: string; size?: number }) {
    const initials = name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();


    return (
        <div
            className={`w-${size} h-${size} rounded-full flex items-center justify-center bg-gray-200 text-gray-700 text-sm font-semibold`}
        >
            {initials}
        </div>
    );
}