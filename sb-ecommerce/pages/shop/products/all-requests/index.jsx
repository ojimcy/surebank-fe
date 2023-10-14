import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import ProductRequestsLists from '../modules/ProductRequestsLists';

const ProductRequests = () => {
    return (
        <PageContainer title="Product Requests">
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Product Requests</h1>
                    </div>
                    <div className="ps-section__content">
                        <ProductRequestsLists />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default ProductRequests;
