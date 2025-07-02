import Link from 'next/link';
import { ProgressBar } from './_components/progress-bar';

const studentInfo = {
    name: 'John Doe',
};

const courses = [
    {
        id: '1',
        name: 'Summer Session 4 Scratch',
        startDate: new Date('2023-7-23'),
        endDate: new Date('2023-7-27'),
        attendance: {
            present: 3,
            late: 1,
            absent: 1,
        },
        totalLessons: 5,
    },
    {
        id: '2',
        name: 'Fall Session 4 Roblox',
        startDate: new Date('2023-10-13'),
        endDate: new Date('2023-11-17'),
        attendance: {
            present: 6,
            late: 0,
            absent: 0,
        },
        totalLessons: 6,
    },
    {
        id: '3',
        name: 'Spring Session 4 JavaScript',
        startDate: new Date('2024-3-14'),
        endDate: new Date('2024-4-26'),
        attendance: {
            present: 3,
            late: 0,
            absent: 0,
        },
        totalLessons: 6,
    },
];

export default async function StudentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    {studentInfo.name}
                </h2>
                <p className="text-sm text-gray-600">
                    Total Courses Attended: {courses.length}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        href={`/dashboard/course/${course.id}`}
                        className="bg-white shadow-md rounded-lg p-4"
                    >
                        <h2 className="text-lg font-semibold mb-2">
                            {course.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-2">
                            {course.startDate.toLocaleDateString()} -{' '}
                            {course.endDate.toLocaleDateString()}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                            <span>Attendance:</span>
                            <span>
                                {course.attendance.present}/
                                {course.attendance.late}/
                                {course.attendance.absent}
                            </span>
                        </div>
                        <ProgressBar
                            attendance={course.attendance}
                            totalLessons={course.totalLessons}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
