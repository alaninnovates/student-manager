import { Avatar } from '@/components/ui/avatar';
import { Student } from '@/lib/types';
import Link from 'next/link';

export const StudentCard = ({
    student,
    joinDate,
    status,
}: {
    student: Student;
    joinDate: Date;
    status: 'active' | 'inactive';
}) => {
    return (
        <Link
            href={`/dashboard/student/${student.id}`}
            key={student.id}
            className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-4 no-underline text-inherit"
        >
            <Avatar className="h-12 w-12">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg text-gray-600">
                    {student.name.charAt(0)}
                </div>
            </Avatar>
            <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p>Join Date: {joinDate.toLocaleDateString()}</p>
                <p className="flex items-center gap-2">
                    Status:
                    <span
                        className={`inline-block w-2 h-2 rounded-full ${
                            status === 'active'
                                ? 'bg-green-500'
                                : 'bg-amber-500'
                        }`}
                    ></span>
                    {status}
                </p>
            </div>
        </Link>
    );
};
