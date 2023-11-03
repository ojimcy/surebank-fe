import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import ProductRequestForm from '~/pages/shop/products/modules/ProductRequestForm';
import DashboardLayout from '~/components/layouts/DashboardLayout';

const CreateProductPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: 'Create',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Become a vendor">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashboardLayout>
                    <ProductRequestForm />
                </DashboardLayout>
            </div>
        </PageContainer>
    );
};

export default CreateProductPage;
