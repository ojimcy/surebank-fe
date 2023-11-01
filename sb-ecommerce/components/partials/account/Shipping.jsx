import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { connect } from 'react-redux';
import { formatNaira } from '~/utilities/formatNaira';
import ModuleCartOrderSummary from '~/components/ecomerce/modules/ModuleCartOrderSummary';
import { getProductCatById } from '~/services/product.service';

const Shipping = ({ shippingAddress, cartItems }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products when the component mounts
        async function fetchProducts() {
            if (cartItems && cartItems.length > 0) {
                const productIds = cartItems.map((item) => item.id);
                const productsArray = [];

                for (const productId of productIds) {
                    const product = await getProductCatById(productId);
                    if (product) {
                        productsArray.push(product);
                    }
                }

                setProducts(productsArray);
            }
        }

        fetchProducts();
    }, [cartItems]);

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
                                        <small>Contact</small>
                                        <p>{shippingAddress.phoneNumber}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>{`${shippingAddress.apartment}, ${shippingAddress.address} ${shippingAddress.city}`}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>
                                            {shippingAddress.shippingMethod}
                                        </small>
                                        <strong>{formatNaira(0)}</strong>
                                    </figure>
                                </div>
                                <h4>Order summary</h4>
                                <ModuleCartOrderSummary cartItems={products} />
                                <div className="ps-block__footer">
                                    <Link href="/account/checkout">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to information
                                        </a>
                                    </Link>
                                    <Link href="/account/payment">
                                        <a className="ps-btn">
                                            Continue to payment
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} />
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
    shippingAddress: state.ecomerce.shippingAddress,
    cartItems: state.ecomerce.cartItems,
});

export default connect(mapStateToProps)(Shipping);
