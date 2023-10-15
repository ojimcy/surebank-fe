import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import ListProductCatalogue from '~/components/partials/account/ListProductCatalogue';

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
                <ListProductCatalogue />
            </div>
        </PageContainer>
    );
};

export default ProductCatalugue;
