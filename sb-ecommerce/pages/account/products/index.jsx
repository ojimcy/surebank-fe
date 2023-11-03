import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import ListProductCatalogue from '~/components/partials/account/ListProductCatalogue';
import DashboardLayout from '~/components/layouts/DashboardLayout';

const ProductCatalugue = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Product Catalogue',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Product Catalogue">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashboardLayout>
                    <ListProductCatalogue />
                </DashboardLayout>
            </div>
        </PageContainer>
    );
};

export default ProductCatalugue;
