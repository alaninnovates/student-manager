import { createClient } from '@/lib/supabase/server';
import { StudentCard } from './StudentCard';

export const StudentList = async ({ query }: { query: string }) => {
    const client = await createClient();
    const { data: students, error } = await client
        .from('students')
        .select('id, name, grade, parent_cells, parent_emails')
        .ilike('name', `%${query}%`)
        .limit(10);

    if (error) {
        console.error('Error fetching students:', error);
        return <div>Error loading students.</div>;
    }

    return students.map((student) => (
        <StudentCard
            key={student.id}
            student={student}
            joinDate={new Date()}
            status="active"
        />
    ));
};
