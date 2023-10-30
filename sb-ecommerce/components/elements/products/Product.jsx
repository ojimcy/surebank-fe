import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const {  badge } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>
                        <img src={product.images[0]} alt={product.name} />
                    </a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">{product.merchantId.storeName}</a>
                </Link>
                <div className="ps-product__content">
                    {product.name}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.reviews.rating}</span>
                    </div>
                    {product.price}{' '}
                    <del className="ml-2">{product.originalPrice}</del>
                </div>
                <div className="ps-product__content hover">
                    {product.name}
                    {product.price}
                </div>
            </div>
        </div>
    );
};

export default Product;
