export default function AwaitingApprovalPage() {
    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Awaiting Approval</h1>
            <p className="text-gray-600">
                You are currently awaiting approval. Please ask an organization
                admin to approve you.
            </p>
        </div>
    );
}
