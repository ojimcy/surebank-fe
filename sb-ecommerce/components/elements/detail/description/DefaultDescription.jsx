import React from 'react';

import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import PartialSpecification from '~/components/elements/detail/description/PartialSpecification';
import PartialVendor from '~/components/elements/detail/description/PartialVendor';
import PartialReview from '~/components/elements/detail/description/PartialReview';

const { TabPane } = Tabs;

const DefaultDescription = ({product}) => {
    return (
        <div className="ps-product__content ps-tab-root">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Description" key="1">
                    <PartialDescription product={product} />
                </TabPane>
                <TabPane tab="Specification" key="2">
                    <PartialSpecification product={product} />
                </TabPane>
                <TabPane tab="Vendor" key="3">
                    <PartialVendor product={product} />
                </TabPane>
                <TabPane tab="Reviews (1)" key="4">
                    <PartialReview product={product} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default DefaultDescription;
