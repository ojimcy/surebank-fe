import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Dashboard from '~/components/partials/account/UserDashboard';
import DashboardLayout from '~/components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useAuth } from '~/context/authContext';

const UserDashboard = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Dashboard',
        },
    ];


    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/account/login?redirect=/account/dashboard');
        }
    }, [currentUser]);

    return (
        <PageContainer footer={<FooterDefault />} title="User Dashboard">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashboardLayout>
                    <Dashboard />
                </DashboardLayout>
            </div>
        </PageContainer>
    );
};

export default UserDashboard;
