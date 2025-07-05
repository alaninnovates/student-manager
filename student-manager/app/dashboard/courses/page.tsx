import Search from '@/components/search/Search';
import { CourseList } from './_components/CourseList';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        start_date?: string;
        end_date?: string;
        limit?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const startDate = searchParams?.start_date
        ? new Date(searchParams.start_date)
        : undefined;
    const endDate = searchParams?.end_date
        ? new Date(searchParams.end_date)
        : undefined;
    let limit = searchParams?.limit ? parseInt(searchParams.limit, 10) : 10;
    if (isNaN(limit) || limit <= 0) {
        console.warn('Invalid limit, defaulting to 10');
        limit = 10;
    }

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Search Courses</h1>
            <div className="flex flex-row gap-4 items-center">
                <Search
                    placeholder="Search for courses..."
                    filters={[
                        { name: 'date', id: 'start_date', text: 'Start date' },
                        { name: 'date', id: 'end_date', text: 'End date' },
                        { name: 'limit', id: 'limit', text: 'Limit' },
                    ]}
                />
            </div>
            <div className="mt-6 space-y-4">
                <CourseList
                    query={query}
                    startDate={startDate}
                    endDate={endDate}
                    limit={limit}
                />
            </div>
        </div>
    );
}
