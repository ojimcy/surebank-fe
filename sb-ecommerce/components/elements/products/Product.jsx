import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>
                        <img src={product.images} alt={product.name} />
                    </a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">{product.brandId}</a>
                </Link>
                <div className="ps-product__content">
                    {product.name}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
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
