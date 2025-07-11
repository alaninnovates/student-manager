import { createClient } from '@/lib/supabase/server';
import { UserTable } from './_components/user-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { redirect } from 'next/navigation';

export default async function ApprovalsPage() {
    const client = await createClient();

    const { data: userData, error: authError } = await client.auth.getUser();
    if (authError || !userData?.user) {
        redirect('/login');
    }

    const { data: userList, error: userError } = await client
        .from('users')
        .select('id, created_at, email, approved, admin')
        .order('created_at', { ascending: false });

    if (userError) {
        console.error('Error fetching users:', userError);
        return <div>Error loading users.</div>;
    }

    const selfAdmin = userList?.some(
        (user) => user.id === userData.user.id && user.admin,
    );

    return (
        <div className="flex flex-col min-h-screen w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Approvals Dashboard</h1>
            <div className="overflow-x-auto">
                <Tabs defaultValue="awaitingApproval">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="awaitingApproval">
                            Awaiting Approval
                        </TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <UserTable
                            users={userList}
                            filter="all"
                            actionsEnabled={selfAdmin}
                        />
                    </TabsContent>
                    <TabsContent value="awaitingApproval">
                        <UserTable
                            users={userList}
                            filter="awaitingApproval"
                            actionsEnabled={selfAdmin}
                        />
                    </TabsContent>
                    <TabsContent value="admin">
                        <UserTable
                            users={userList}
                            filter="admin"
                            actionsEnabled={selfAdmin}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
