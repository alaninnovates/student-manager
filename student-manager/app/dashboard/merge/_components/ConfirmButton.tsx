'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ConfirmButton = ({
    selected1,
    selected2,
}: {
    selected1: number | undefined;
    selected2: number | undefined;
}) => {
    const client = createClient();
    const [shown, setShown] = useState(false);
    const { replace } = useRouter();

    useEffect(() => {
        if (shown) return;
        if (selected1 && selected2) {
            setShown(true);
            toast(`Confirm merge? This action cannot be undone.`, {
                action: {
                    label: 'Confirm',
                    onClick: async () => {
                        const { error } = await client.rpc('merge_users', {
                            student1: selected1,
                            student2: selected2,
                        });
                        if (error) {
                            console.error('Error merging students:', error);
                            toast.error('Failed to merge students.');
                            return;
                        }
                        replace('/dashboard/merge');
                    },
                },
            });
        }
    }, [selected1, selected2, shown]);

    useEffect(() => {
        if (selected1 || selected2) {
            setShown(false);
        }
    }, [selected1, selected2]);

    return <></>;
};
