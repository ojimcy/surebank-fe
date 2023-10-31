import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
    carouselFullwidth,
    carouselStandard,
} from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';
import { getProductBySlug } from '~/services/product.service';
import { ProductGroupWithCarousel } from './ProductGroupWithCarousel';

const CustomerBought = ({ collectionSlug, boxed, layout }) => {
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
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header">
                <h3>Customers who bought this item also bought</h3>
            </div>
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default CustomerBought;
