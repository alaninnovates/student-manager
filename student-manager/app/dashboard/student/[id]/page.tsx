import Link from 'next/link';
import { ProgressBar } from './_components/progress-bar';
import { createClient } from '@/lib/supabase/server';
import { AttendedStatus } from '@/lib/types';
import { MailIcon, PhoneIcon } from 'lucide-react';

interface Class {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    attendance: {
        present: number;
        late: number;
        absent: number;
        excused: number;
    };
    totalLessons: number;
}

export default async function StudentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const client = await createClient();
    const { data: studentData, error } = await client
        .from('students')
        .select('id, name, grade, parent_cells, parent_emails')
        .eq('id', id)
        .single();
    const { data: studentAttendance, error: attendanceError } = await client
        .from('attendance')
        .select('id, classes(id, name, dates), level, attended_statuses')
        .eq('student_id', id);
    if (error || attendanceError) {
        console.error('Error fetching student data:', error || attendanceError);
        return <div>Error loading student data.</div>;
    }
    console.log(studentAttendance);

    const processedClasses = studentAttendance.map((attendance) => {
        interface AttendanceCounts {
            present: number;
            late: number;
            absent: number;
            excused: number;
        }

        const attendanceCounts: AttendanceCounts =
            attendance.attended_statuses.reduce(
                (acc: AttendanceCounts, status: string) => {
                    acc[status as AttendedStatus] =
                        (acc[status as AttendedStatus] || 0) + 1;
                    return acc;
                },
                { present: 0, late: 0, absent: 0, excused: 0 },
            );

        const classData = attendance.classes;
        return {
            id: classData.id,
            name: classData.name,
            startDate: new Date(classData.dates[0]),
            endDate: new Date(classData.dates[classData.dates.length - 1]),
            attendance: attendanceCounts,
            totalLessons: classData.dates.length,
        } as Class;
    });

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            {studentData.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Grade: {studentData.grade} • Courses:{' '}
                            {processedClasses.length}
                        </p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active Student
                    </div>
                </div>

                <div className="mt-4 border-t pt-4">
                    <h3 className="text-md font-medium mb-2">
                        Parent Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                Phone Numbers
                            </p>
                            {studentData.parent_cells?.map(
                                (cell: string, i: number) => (
                                    <p
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                                        <a
                                            href={`tel:${cell}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {cell}
                                        </a>
                                    </p>
                                ),
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Email Addresses
                            </p>
                            {studentData.parent_emails?.map(
                                (email: string, i: number) => (
                                    <p
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <MailIcon className="h-4 w-4 text-gray-400" />
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {email}
                                        </a>
                                    </p>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(processedClasses).map((course) => (
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
                                {course.attendance.absent +
                                    course.attendance.excused}
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
