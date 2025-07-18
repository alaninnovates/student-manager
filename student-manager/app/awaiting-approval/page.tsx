import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AwaitingApprovalPage() {
    const supabase = await createClient();

    const { data: amIApproved, error: amIApprovedError } = await supabase.rpc(
        'am_i_approved',
    );

    if (amIApprovedError) {
        console.error('Error checking approval status:', amIApprovedError);
        return <div>Error checking approval status.</div>;
    }

    if (amIApproved) {
        return redirect('/dashboard');
    }

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
