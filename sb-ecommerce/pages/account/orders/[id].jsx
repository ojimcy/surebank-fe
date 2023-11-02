import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import ModuleCartOrderSummary from '~/components/ecomerce/modules/ModuleCartOrderSummary';
import { useRouter } from 'next/router';
import { getOrderById } from '~/services/order.service';

const Order = () => {
    const router = useRouter();
    const { id } = router.query;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getOrder(id) {
        setLoading(true);
        const responseData = await getOrderById(id);
        if (responseData) {
            setOrder(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getOrder(id);
    }, [id]);
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Place Order</h1>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    order && (
                        <div className="ps-section__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    <div className="ps-block--shipping">
                                        <div className="ps-block__panel">
                                            <figure>
                                                <small>Contact</small>
                                                <p>{`${order.shippingAddress?.fullName}, ${order.shippingAddress?.phoneNumber}`}</p>
                                            </figure>
                                            <figure>
                                                <small>Ship to</small>
                                                <p>{`${order.shippingAddress?.apartment}, ${order.shippingAddress?.address} ${order.shippingAddress?.city}`}</p>
                                                <Link
                                                    href={`/account/orders/update/${order.id}`}>
                                                    <a>Change</a>
                                                </Link>
                                            </figure>
                                        </div>
                                        <h4>Shipping</h4>
                                        <div className="ps-block__panel">
                                            <figure>
                                                <small>Shipping Method</small>
                                                <strong>
                                                    {order?.shippingMethod}
                                                </strong>
                                            </figure>
                                            <figure>
                                                <small>Payment Method</small>
                                                <strong>
                                                    {order?.paymentMethod}
                                                </strong>
                                            </figure>
                                            <figure>
                                                <small>Status</small>
                                                <strong>
                                                    {
                                                        order?.paymentResult
                                                            .status
                                                    }
                                                </strong>
                                            </figure>
                                        </div>

                                        <h4>Order summary</h4>
                                        <ModuleCartOrderSummary
                                            cartItems={order.orderItems}
                                        />
                                        <div className="ps-block__footer">
                                            <Link href="/account/shipping">
                                                <a>
                                                    <i className="icon-arrow-left mr-2"></i>
                                                    Return to information
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <ModulePaymentOrderSummary
                                            order={order}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Order;
