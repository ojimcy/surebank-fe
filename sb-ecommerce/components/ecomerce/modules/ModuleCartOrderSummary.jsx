import React from 'react';
import { connect } from 'react-redux';
import { Result } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatNaira } from '~/utilities/formatNaira';

const ModuleEcomerceCartItems = ({ cartItems }) => {
    const { thumbnailImage, title } = useProduct();
    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.id}>
                <td>
                    <div className="ps-product--cart">
                        <div className="ps-product__thumbnail">
                            <Link
                                href="/product/[pid]"
                                as={`/product/${item._id}`}>
                                <a>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="ps-product__content">
                            <Link
                                href="/product/[pid]"
                                as={`/product/${item._id}`}>
                                <a>{item.name}</a>
                            </Link>
                        </div>
                    </div>
                </td>
                <td data-label="price" className="price">
                    {formatNaira(item.price)}
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
