'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ClubDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const clubId = searchParams.get('id');
        if (!clubId) {
            router.push('/clubs');
        }
    }, [router, searchParams]);

    // Render content only if clubId exists, or a loading state
    // For now, returning null if redirecting or waiting for redirect
    if (!searchParams.get('id')) {
        return null;
    }

    return (
        <div>
            <h1>Club Details</h1>
            {/* Display club details here based on clubId */}
            <p>Club ID: {searchParams.get('id')}</p>
        </div>
    );
}
