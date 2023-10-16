import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import { formatNaira } from '~/utilities/formatNaira';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;
    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">&{formatNaira(product.salesPrice)}</del>
                {formatNaira(product.price)}
            </h4>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">{formatNaira(product.price)}</h4>
        );
    }
    return (
        <header>
            <h1>{product.title}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product.brand}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
