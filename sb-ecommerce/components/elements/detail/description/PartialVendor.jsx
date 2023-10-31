import React from 'react';

const PartialVendor = ({ product }) => {
    return (
        <section>
            <h4>{product.merchantId?.storeName}</h4>
            <a href="#">More Products from {product.merchantId?.storeName}</a>
        </section>
    );
};

export default PartialVendor;
