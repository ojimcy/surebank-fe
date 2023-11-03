import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import DashboardLayout from '~/components/layouts/DashboardLayout';
import ProductRequestsLists from '~/pages/shop/products/modules/ProductRequestsLists';

const ProductCatalugue = () => {
    
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
             text: 'Product Requests',
         },
     ];

    return (
        <PageContainer footer={<FooterDefault />} title="Product Requests">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashboardLayout>
                    <ProductRequestsLists />
                </DashboardLayout>
            </div>
        </PageContainer>
    );
};

export default ProductCatalugue;
