'use client';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export const SidebarAccountInfo = () => {
    const client = createClient();

    const handleSignOut = async () => {
        const { error } = await client.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        } else {
            redirect('/auth/login');
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={handleSignOut}
                >
                    Signout
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
