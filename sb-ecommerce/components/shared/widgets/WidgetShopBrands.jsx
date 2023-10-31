import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox } from 'antd';
import { Radio, Input } from 'antd';
import { useRouter } from 'next/router';
import { getBrands } from '~/services/product.service';

const WidgetShopBrands = () => {
    const Router = useRouter();
    const [brands, setBrands] = useState(null);
    const [loading, setLoading] = useState(false);

    const { slug } = Router.query;

    async function getProductBrands() {
        setLoading(true);
        const responseData = await getBrands();
        if (responseData) {
            setBrands(responseData.results);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProductBrands();
    }, []);

    function handleSelectBrand(e) {
        Router.push(`/brand/${e.target.value}`);
    }
    // Views
    let brandsView;
    if (!loading) {
        if (brands && brands.length > 0) {
            const items = brands.map((item) => (
                <li key={item.id}>
                    <Link href={`shop/${item.slug}`}>{item.name}</Link>
                </li>
            ));
            brandsView = <ul className="ps-list--brands">{items}</ul>;
        } else {
        }
    } else {
        brandsView = <p>Loading...</p>;
    }
    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title">By Brands</h4>
            <figure>
                <Radio.Group
                    defaultValue={slug}
                    options={brands}
                    onChange={handleSelectBrand}
                />
            </figure>
        </aside>
    );
};

export default WidgetShopBrands;
