export const ProgressBar = ({
    attendance,
    totalLessons,
}: {
    attendance: {
        present: number;
        late: number;
        absent: number;
    };
    totalLessons: number;
}) => (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-2 flex">
        <div
            className="bg-green-500 h-full rounded-l-full"
            style={{
                width: `${(attendance.present / totalLessons) * 100}%`,
            }}
        ></div>
        <div
            className="bg-yellow-500 h-full"
            style={{
                width: `${(attendance.late / totalLessons) * 100}%`,
            }}
        ></div>
        <div
            className="bg-red-500 h-full rounded-r-full"
            style={{
                width: `${(attendance.absent / totalLessons) * 100}%`,
            }}
        ></div>
    </div>
);
