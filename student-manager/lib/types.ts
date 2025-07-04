export interface Student {
    id: string;
    name: string;
    grade: string;
    parent_cells: string[];
    parent_emails: string[];
}

export type AttendedStatus = 'present' | 'late' | 'absent' | 'excused';

export interface Course {
    id: string;
    name: string;
    dates: string[];
}
