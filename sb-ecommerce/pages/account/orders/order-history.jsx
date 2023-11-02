import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import OrderHistories from '~/components/partials/account/OrderHistory';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const OrderHistory = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order history',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Order History">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <OrderHistories />
                </div>
            </PageContainer>
        </>
    );
};

export default OrderHistory;
