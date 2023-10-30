import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Rating from '../Rating';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '~/components/elements/products/modules/ModuleProductProgressbar';
import useProduct from '~/hooks/useProduct';
import LazyLoad from 'react-lazyload';

const ProductDealOfDay = ({ product }) => {
    const { thumbnailImage, badge, title } = useProduct();
    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <LazyLoad>
                        <img src={product.images[0]} alt={product.title} />
                    </LazyLoad>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">
                        {product.merchantId.storeName}{' '}
                    </a>
                </Link>
                <div className="ps-product__content">
                    {StrapiProductPriceExpanded(product)}
                    {title(product)}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.reviews.rating}</span>
                    </div>
                    <ModuleProductProgressbar product={product} />
                </div>
            </div>
        </div>
    );
};

export default connect()(ProductDealOfDay);
