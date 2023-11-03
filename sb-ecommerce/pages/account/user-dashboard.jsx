import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Dashboard from '~/components/partials/account/UserDashboard';
import DashboardLayout from '~/components/layouts/DashboardLayout';

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
