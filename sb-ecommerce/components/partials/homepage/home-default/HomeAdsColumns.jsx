import React from 'react';

import Promotion from '~/components/elements/media/Promotion';

const HomeAdsColumns = () => {
    const promotions = [
        { id: 1, imageUrl: '/static/img/slider/home-1/promotion-1.jpg' },
        { id: 2, imageUrl: '/static/img/slider/home-1/promotion-2.jpg' },
        { id: 3, imageUrl: '/static/img/slider/home-1/promotion-1.jpg' },
    ];

    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    {promotions.map((promotion) => (
                        <div
                            key={promotion.id}
                            className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <Promotion
                                link="/shop"
                                image={promotion ? promotion.imageUrl : null}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeAdsColumns;
