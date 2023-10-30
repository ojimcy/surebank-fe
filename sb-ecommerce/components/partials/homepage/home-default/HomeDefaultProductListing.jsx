import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import { getProductBySlug } from '~/services/product.service';

const HomeDefaultProductListing = ({ collectionSlug, title }) => {
    const [currentCollection, setCurrentCollection] = useState('new-arrivals');
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

    const sectionLinks = [
        {
            title: 'New Arrivals',
            name: 'new-arrivals',
            slug: collectionSlug,
        },
        {
            title: 'Best seller',
            name: 'best-seller',
            slug: 'fullwidth-clothing-best-sellers',
        },
        {
            title: 'Most Popular',
            name: 'most-popular',
            slug: 'fullwidth-clothing-most-popular',
        },
    ];

    function handleChangeTab(e, tab) {
        e.preventDefault();
        setCurrentCollection(tab.name);
        getProducts(tab.slug);
    } 

    useEffect(() => {
        getProducts(collectionSlug);
    }, [collectionSlug]);

    const sectionLinksView = sectionLinks.map((link) => (
        <li
            className={currentCollection === link.name ? 'active' : ''}
            key={link.name}>
            <a href="#" onClick={(e) => handleChangeTab(e, link)}>
                {link.title}
            </a>
        </li>
    ));

    // views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = (
                <ProductGroupWithCarousel
                    products={productItems}
                    type="fullwidth"
                />
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-product-list">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">
                        {sectionLinksView}
                        <li>
                            <Link href={`/shop`}>
                                <a>View All</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultProductListing;
