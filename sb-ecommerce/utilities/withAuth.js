import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '~/context/authContext';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { currentUser } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!currentUser) {
                router.push('/account/login');
            }
        }, [currentUser, router]);

        if (!currentUser) {
            return null;
        }

        // Render the protected component if authenticated
        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
