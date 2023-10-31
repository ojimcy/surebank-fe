import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import CountDownSimple from '~/components/elements/CountDownSimple';
import { generateTempArray } from '~/utilities/common-helpers';
import { getProductBySlug } from '~/services/product.service';
import { ProductGroupWithCarousel } from '../../product/ProductGroupWithCarousel';

const HomeDefaultDealOfDay = ({ collectionSlug }) => {
    const [loading, setLoading] = useState(false)
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
        <div className="ps-deal-of-day">
            <div className="ps-container">
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Deal of the day</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
