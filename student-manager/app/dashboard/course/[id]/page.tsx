import { createClient } from '@/lib/supabase/server';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const toTitleCase = (str: string) => {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default async function CoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const client = await createClient();
    const { data: course, error: courseError } = await client
        .from('classes')
        .select('id, name, dates')
        .eq('id', id)
        .single();
    const { data: students, error: studentsError } = await client
        .from('attendance')
        .select('students(id, name, grade), level, attended_statuses')
        .eq('class_id', id);
    if (courseError) {
        console.error('Error fetching course:', courseError);
        return <div>Error loading course details.</div>;
    }
    if (studentsError) {
        console.error('Error fetching students:', studentsError);
        return <div>Error loading student attendance.</div>;
    }

    students.sort((a, b) => {
        const levels = ['beginner', 'intermediate', 'advanced'];
        return (
            levels.indexOf(a.level) - levels.indexOf(b.level) ||
            // @ts-expect-error bro supabase is dumb
            a.students.name.localeCompare(b.students.name)
        );
    });

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Course Dashboard</h1>
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="sticky left-0 bg-white">
                                Student Name
                            </TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Level</TableHead>
                            {course.dates.map((date: string) => (
                                <TableHead key={date}>{date}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((s) => {
                            const student = s as unknown as {
                                students: {
                                    id: string;
                                    name: string;
                                    grade: string;
                                };
                                level: string;
                                attended_statuses: string[];
                            };
                            return (
                                <TableRow key={student.students.id}>
                                    <TableCell className="sticky left-0 bg-white">
                                        <Link
                                            href={`/dashboard/student/${student.students.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {student.students.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {student.students.grade}
                                    </TableCell>
                                    <TableCell
                                        className={cn({
                                            'bg-green-300':
                                                student.level === 'beginner',
                                            'bg-yellow-300':
                                                student.level ===
                                                'intermediate',
                                            'bg-red-300':
                                                student.level === 'advanced',
                                        })}
                                    >
                                        {toTitleCase(student.level)}
                                    </TableCell>
                                    {student.attended_statuses.map(
                                        (status: string, index: number) => (
                                            <TableCell
                                                key={index}
                                                className={cn({
                                                    'bg-green-100':
                                                        status === 'present',
                                                    'bg-yellow-100':
                                                        status === 'late',
                                                    'bg-red-100':
                                                        status === 'absent',
                                                    'bg-gray-100':
                                                        status === 'excused',
                                                })}
                                            >
                                                {toTitleCase(status)}
                                            </TableCell>
                                        ),
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={course.dates.length + 3}>
                                Total Students: {students.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
