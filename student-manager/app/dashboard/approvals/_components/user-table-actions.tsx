'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';
import { MoreHorizontal } from 'lucide-react';

export const UserTableActions = ({
    user,
}: {
    user: {
        id: string;
        created_at: string;
        email: string;
        approved: boolean;
        admin: boolean;
    };
}) => {
    const client = createClient();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {user.admin ? (
                    <DropdownMenuItem
                        onClick={async () => {
                            const { error } = await client
                                .from('users')
                                .update({ admin: false })
                                .eq('id', user.id);
                            if (error) {
                                console.error('Error demoting user:', error);
                            } else {
                                window.location.reload();
                            }
                        }}
                    >
                        Demote from admin
                    </DropdownMenuItem>
                ) : (
                    <>
                        {user.approved ? (
                            <DropdownMenuItem
                                onClick={async () => {
                                    const { error } = await client
                                        .from('users')
                                        .update({ approved: false })
                                        .eq('id', user.id);
                                    if (error) {
                                        console.error(
                                            'Error unapproving user:',
                                            error,
                                        );
                                    } else {
                                        window.location.reload();
                                    }
                                }}
                            >
                                Unapprove user
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                onClick={async () => {
                                    const { error } = await client
                                        .from('users')
                                        .update({ approved: true })
                                        .eq('id', user.id);
                                    if (error) {
                                        console.error(
                                            'Error approving user:',
                                            error,
                                        );
                                    } else {
                                        window.location.reload();
                                    }
                                }}
                            >
                                Approve user
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            onClick={async () => {
                                const { error } = await client
                                    .from('users')
                                    .update({ admin: true })
                                    .eq('id', user.id);
                                if (error) {
                                    console.error(
                                        'Error promoting user to admin:',
                                        error,
                                    );
                                } else {
                                    window.location.reload();
                                }
                            }}
                        >
                            Make admin
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
