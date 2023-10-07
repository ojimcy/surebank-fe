import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeAds = () => {
    const promotion1 = '/static/img/collection/home-1/ad-1.jpg';
    const promotion2 = '/static/img/collection/home-1/ad-2.jpg';

    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        <Promotion link="/shop" image={promotion1} />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion link="/shop" image={promotion2} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeAds;
