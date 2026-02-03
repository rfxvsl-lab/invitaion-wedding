import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LegacyMyInvitation() {
    const router = useRouter();
    useEffect(() => {
        router.push('/editor');
    }, []);
    return null;
}
