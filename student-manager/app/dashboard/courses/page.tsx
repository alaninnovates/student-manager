import Search from '@/components/Search';
import { CourseList } from './_components/CourseList';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Search Courses</h1>
            <div className="flex flex-row gap-4 items-center">
                <Search placeholder="Search for courses..." />
            </div>
            <div className="mt-6 space-y-4">
                <CourseList query={query} />
            </div>
        </div>
    );
}
