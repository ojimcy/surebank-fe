import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import { useAuth } from '~/context/authContext';

const CheckoutPage = () => {
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
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
