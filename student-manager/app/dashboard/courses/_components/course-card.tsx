import { Course } from '@/lib/types';
import Link from 'next/link';

export const CourseCard = ({ course }: { course: Course }) => {
    return (
        <Link
            href={`/dashboard/course/${course.id}`}
            key={course.id}
            className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-4 no-underline text-inherit"
        >
            <div className="flex-grow">
                <h2 className="text-lg font-semibold">{course.name}</h2>
                <div className="mt-1 text-sm text-gray-600">
                    <p className="font-medium">Dates:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {course.dates.map((date, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md"
                            >
                                {date}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};
