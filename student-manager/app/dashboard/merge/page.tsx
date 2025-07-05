import Search from '@/components/search';
import { StudentList } from '@/components/student/student-list';
import { Toaster } from 'sonner';
import { ConfirmButton } from './_components/confirm-button';

export default async function MergePage(props: {
    searchParams?: Promise<{
        query1?: string;
        query2?: string;
        selected1?: string;
        selected2?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query1 = searchParams?.query1 || '';
    const query2 = searchParams?.query2 || '';
    const selected1 = searchParams?.selected1
        ? parseInt(searchParams.selected1, 10)
        : undefined;
    const selected2 = searchParams?.selected2
        ? parseInt(searchParams.selected2, 10)
        : undefined;

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <Toaster
                duration={Number.POSITIVE_INFINITY}
                position="bottom-center"
                closeButton
            />
            <ConfirmButton selected1={selected1} selected2={selected2} />
            <h1 className="text-2xl font-bold mb-4">Merge Students</h1>
            <div className="flex flex-row gap-4">
                <div className="flex-1">
                    <Search
                        name="query1"
                        placeholder="Search for first student..."
                    />
                    <div className="mt-6 space-y-4">
                        <StudentList
                            query={query1}
                            selectable
                            selectName="selected1"
                            selected={selected1}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <Search
                        name="query2"
                        placeholder="Search for second student..."
                    />
                    <div className="mt-6 space-y-4">
                        <StudentList
                            query={query2}
                            selectable
                            selectName="selected2"
                            selected={selected2}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
