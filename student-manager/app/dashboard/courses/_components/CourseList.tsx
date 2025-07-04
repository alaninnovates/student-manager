import { createClient } from '@/lib/supabase/server';
import { CourseCard } from './CourseCard';

export const CourseList = async ({ query }: { query: string }) => {
    const client = await createClient();
    const { data: courses, error } = await client
        .from('classes')
        .select('id, name, dates')
        .ilike('name', `%${query}%`)
        .limit(10);

    if (error) {
        console.error('Error fetching courses:', error);
        return <div>Error loading courses.</div>;
    }

    return courses.map((course) => (
        <CourseCard key={course.id} course={course} />
    ));
};
