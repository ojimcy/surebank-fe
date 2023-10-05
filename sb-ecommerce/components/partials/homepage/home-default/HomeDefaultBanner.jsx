import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import Promotion from '~/components/elements/media/Promotion';

const HomeDefaultBanner = () => {
    const [bannerItems, setBannerItems] = useState(null);
    const [promotions, setPromotions] = useState([]);

    const fetchBannerItems = async () => {
        try {
            const responseData = await MediaRepository.getBannersBySlug(
                'banner-home-fullwidth'
            );
            if (responseData) {
                setBannerItems(responseData);
            }
        } catch (error) {
            console.error('Error fetching banner items:', error);
        }
    };
    const fetchPromotions = async () => {
        try {
            const responseData = await MediaRepository.getPromotionsBySlug(
                'home_fullwidth_promotions'
            );
            if (responseData) {
                setPromotions(responseData);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };
    useEffect(() => {
        fetchBannerItems();
        fetchPromotions();
    }, []);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    let mainCarouselView = null;
    if (bannerItems) {
        const carouselItems = bannerItems.map((item) => (
            <div className="slide-item" key={item.id}>
                <Link href="/shop">
                    <a
                        className="ps-banner-item--default bg--cover"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                </Link>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSettings} className="ps-carousel">
                {carouselItems}
            </Slider>
        );
    }

    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">{mainCarouselView}</div>
                <div className="ps-section__right">
                    {promotions.map((promotion) => (
                        <Promotion key={promotion.id} link="/shop" image={promotion.imageUrl} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
