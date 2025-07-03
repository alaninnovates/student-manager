export default async function CoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Course Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Course ID: {id}</h2>
                <p className="text-gray-600">
                    Course details will be displayed here.
                </p>
            </div>
        </div>
    );
}
