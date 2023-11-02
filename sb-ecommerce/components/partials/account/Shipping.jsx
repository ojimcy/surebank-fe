import React from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { connect } from 'react-redux';
import { formatNaira } from '~/utilities/formatNaira';
import ModuleCartOrderSummary from '~/components/ecomerce/modules/ModuleCartOrderSummary';

const Shipping = ({ order }) => {
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact: </small>
                                        <p>{`${order.shippingAddress.fullName}, ${order.shippingAddress.phoneNumber}`}</p>
                                    </figure>
                                    <figure>
                                        <small>Ship to: </small>
                                        <p>{`${order.shippingAddress.apartment}, ${order.shippingAddress.address} ${order.shippingAddress.city}`}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>{order.shippingMethod}</small>
                                        <strong>{formatNaira(0)}</strong>
                                    </figure>
                                </div>
                                <h4>Order summary</h4>
                                <ModuleCartOrderSummary
                                    cartItems={order.orderItems}
                                />
                                <div className="ps-block__footer">
                                    <Link href="/account/checkout">
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
                                <ModulePaymentOrderSummary order={order} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Connect the component to access the shippingAddress from the Redux store
const mapStateToProps = (state) => ({
    order: state.ecomerce.order,
});

export default connect(mapStateToProps)(Shipping);
