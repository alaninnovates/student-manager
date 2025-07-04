import { createClient } from '@/lib/supabase/server';
import { CourseCard } from './CourseCard';

export const CourseList = async ({
    query,
    startDate,
    endDate,
    limit,
}: {
    query: string;
    startDate?: Date;
    endDate?: Date;
    limit: number;
}) => {
    const client = await createClient();
    const { data: courses, error } = await client
        .from('classes')
        .select('id, name, dates, start_date, end_date')
        .ilike('name', `%${query}%`)
        .gte(
            'start_date',
            startDate ? startDate.toISOString() : new Date(0).toISOString(),
        )
        .lte(
            'end_date',
            endDate ? endDate.toISOString() : new Date().toISOString(),
        )
        .order('start_date', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Error fetching courses:', error);
        return <div>Error loading courses.</div>;
    }

    return courses.map((course) => (
        <CourseCard key={course.id} course={course} />
    ));
};
