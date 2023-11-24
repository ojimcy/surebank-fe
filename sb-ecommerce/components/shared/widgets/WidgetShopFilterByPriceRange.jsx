import React, { useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { formatNaira } from '~/utilities/formatNaira';

const WidgetShopFilterByPriceRange = () => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500000);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);

        /*  const params = {
            price_gt: value[0],
        };*/
        Router.push(`/shop?price_gt=${value[0]}&price_lt=${value[1]}`);
        /*this.props.dispatch(getProductsByPrice(params));*/
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                <Slider
                    range
                    defaultValue={[0, 500000]}
                    max={500000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Price: {formatNaira(min)} - {formatNaira(max)}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
