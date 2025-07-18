'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error?.code === 'invalid_credentials') {
        redirect('/auth/login?error=invalid_credentials');
    }

    const { data: amIApproved, error: amIApprovedError } = await supabase.rpc(
        'am_i_approved',
    );

    if (error || amIApprovedError) {
        console.log('Error logging in:', error);
        redirect('/');
    }

    if (!amIApproved) {
        redirect('/awaiting-approval');
    }

    // revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp(data);
    const { data: amIApproved, error: amIApprovedError } = await supabase.rpc(
        'am_i_approved',
    );

    if (error || amIApprovedError) {
        console.log('Error signing up:', error);
        redirect('/');
    }

    if (!amIApproved) {
        redirect('/awaiting-approval');
    }

    // revalidatePath('/', 'layout');
    redirect('/dashboard');
}
