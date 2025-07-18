import { AuthForm } from '@/components/auth-form';

export default async function Page(props: {
    searchParams?: Promise<{
        error?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error || '';

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthForm signup error={error} />
            </div>
        </div>
    );
}
