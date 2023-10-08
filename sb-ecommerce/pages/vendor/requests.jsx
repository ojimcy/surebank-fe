import React from 'react';
import MerchantRequestsLists from './modules/MerchantRequestsList';
import PageContainer from '~/components/layouts/PageContainer';

const ShoppingCart = () => {
    return (
        <PageContainer title="Merchant Requests">
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Merchant Requests</h1>
                    </div>
                    <div className="ps-section__content">
                        <MerchantRequestsLists />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default ShoppingCart;
