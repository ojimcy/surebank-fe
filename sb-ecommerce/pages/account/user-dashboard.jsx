import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import Dashboard from '~/components/partials/account/UserDashboard';

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
                <Dashboard />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default UserDashboard;
