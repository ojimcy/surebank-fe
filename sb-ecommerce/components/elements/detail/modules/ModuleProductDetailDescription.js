import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
            Sold By:
            <Link href="/shop">
                <a>
                    <strong> {product.merchantId.storeName}</strong>
                </a>
            </Link>
        </p>
    </div>
);

export default ModuleProductDetailDescription;
