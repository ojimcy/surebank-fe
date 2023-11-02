import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { formatNaira } from '~/utilities/formatNaira';
import { useRouter } from 'next/router';

const ModulePaymentOrderSummary = ({ ecomerce, order }) => {
    const router = useRouter();
    const { products, getProducts } = useEcomerce();

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);
    const shippingFee = 0;
    // view
    let listItemsView, shippingView, totalView;
    let amount;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
        listItemsView = products.map((item) => (
            <Link href="/" key={item.id}>
                <a>
                    <strong>
                        {item.title}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>
                        {formatNaira(parseInt(item.quantity * item.price))}
                    </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    shippingView = (
        <figure>
            <figcaption>
                <strong>Shipping Fee</strong>
                <small>{formatNaira(shippingFee)}</small>
            </figcaption>
        </figure>
    );
    totalView = (
        <figure className="ps-block__total">
            <h3>
                Total
                <strong>{formatNaira(parseInt(amount) + shippingFee)}</strong>
            </h3>
        </figure>
    );

    const handlePayment = () => {
        router.push(`/account/orders/${order.id}`);
    };

    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>{formatNaira(parseInt(amount))}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
                {order && (
                    <a className="ps-btn order-btn" onClick={handlePayment}>
                        Continue to payment
                    </a>
                )}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
