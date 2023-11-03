import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import AddProductCatalogue from '~/components/partials/account/ProductCatalogue';
import DashboardLayout from '~/components/layouts/DashboardLayout';

const CreateProductCatalugue = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Products',
            url: '/account/products',
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
                    <AddProductCatalogue />
                </DashboardLayout>
                
            </div>
        </PageContainer>
    );
};

export default CreateProductCatalugue;
