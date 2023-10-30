import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProductById } from '~/services/product.service';

const ModuleProductDetailSpecification = ({ product }) => {
    const [productInfo, setProductInfo] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(product.id);
            setProductInfo(productData);
        };
        fetchProduct();
    }, []);
    return (
        <div className="ps-product__specification">
            <Link href="/page/blank">
                <a className="report">Report Product</a>
            </Link>
            <p>
                <strong>SKU:</strong> {productInfo.sku}
            </p>
            <p className="categories">
                <strong> Categories:</strong>
                <Link href="/shop">
                    <a>{productInfo.categoryId?.name}</a>
                </Link>
            </p>
            <p className="tags">
                <strong> Tags</strong>
                {productInfo && productInfo.tags?.map((tag, index) => (
                    <Link href="/shop" key={index}>
                        <a>{tag}</a>
                    </Link>
                ))}
            </p>
        </div>
    );
};

export default ModuleProductDetailSpecification;
