import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Shipping from '~/components/partials/account/Shipping';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useRouter } from 'next/router';
import { useAuth } from '~/context/authContext';

const ShippingPage = () => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/account/login');
        }
    }, [currentUser, router]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
            url: '/account/checkout',
        },
        {
            text: 'Shipping',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shipping">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Shipping />
                </div>
            </PageContainer>
        </>
    );
};

export default connect()(ShippingPage);
