import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { getProductBySlug } from '~/services/product.service';
import { ProductGroupWithCarousel } from './ProductGroupWithCarousel';

const RelatedProduct = ({ collectionSlug, boxed, layout }) => {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);

    async function getProducts() {
        setLoading(true);
        const responseData = await getProductBySlug(collectionSlug);
        if (responseData) {
            setProductItems(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProducts(collectionSlug);
    }, [collectionSlug]);

    // Views
    let carouselView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            carouselView = (
                <ProductGroupWithCarousel
                    products={productItems}
                    type="fullwidth"
                />
            );
        } else {
            carouselView = <p>No product(s) found.</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <div
            className={`ps-section--default ps-related-products ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header">
                <h3>Related products</h3>
            </div>
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default RelatedProduct;
