import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import MerchantApplicationForm from './modules/MerchantApplicationForm';

const BecomeAVendorPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Become a Vendor',
            url: '/vendor/become-a-vendor',
        },
        {
            text: 'Apply'
        }
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Become a vendor">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <MerchantApplicationForm />
            </div>
        </PageContainer>
    );
};

export default BecomeAVendorPage;
