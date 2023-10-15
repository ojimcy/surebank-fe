import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import AddProductCatalogue from '~/components/partials/account/ProductCatalogue';

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
                <AddProductCatalogue />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default ProductCatalugue;
