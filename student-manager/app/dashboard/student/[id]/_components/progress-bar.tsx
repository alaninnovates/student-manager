import { cn } from '@/lib/utils';

export const ProgressBar = ({
    attendance,
    totalLessons,
}: {
    attendance: {
        present: number;
        late: number;
        absent: number;
        excused: number;
    };
    totalLessons: number;
}) => (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-2 flex">
        <div
            className={cn('bg-green-500 h-full rounded-l-full', {
                'rounded-r-full':
                    attendance.late === 0 &&
                    attendance.excused + attendance.absent === 0,
            })}
            style={{
                width: `${(attendance.present / totalLessons) * 100}%`,
            }}
        ></div>
        <div
            className={cn('bg-yellow-500 h-full', {
                'rounded-l-full': attendance.present === 0,
                'rounded-r-full': attendance.absent + attendance.excused === 0,
            })}
            style={{
                width: `${(attendance.late / totalLessons) * 100}%`,
            }}
        ></div>
        <div
            className={cn('bg-red-500 h-full rounded-r-full', {
                'rounded-l-full':
                    attendance.present === 0 && attendance.late === 0,
            })}
            style={{
                width: `${
                    ((attendance.absent + attendance.excused) / totalLessons) *
                    100
                }%`,
            }}
        ></div>
    </div>
);
