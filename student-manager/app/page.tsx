'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
    const { replace } = useRouter();
    replace('/auth/login');
}
