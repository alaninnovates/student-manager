import Search from '@/components/search/Search';
import { StudentList } from '@/components/student/StudentList';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Search Students</h1>
            <div className="flex flex-row gap-4 items-center">
                <Search placeholder="Search for students..." />
            </div>
            <div className="mt-6 space-y-4">
                <StudentList query={query} />
            </div>
        </div>
    );
}
