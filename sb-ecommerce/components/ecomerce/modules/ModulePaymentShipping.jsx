import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

const ModulePaymentShipping = ({ order }) => {
    console.log(order);
    return (
        <>
            <div className="ps-block__panel">
                <figure>
                    <small>Contact</small>
                    <p>test@gmail.com</p>
                    <Link href="/account/checkout">
                        <a>Change</a>
                    </Link>
                </figure>
                <figure>
                    <small>Ship to</small>
                    <p>2015 South Street, Midland, Texas</p>
                    <Link href="/account/checkout">
                        <a>Change</a>
                    </Link>
                </figure>
            </div>
            <h4>Shipping Method</h4>
            <div className="ps-block__panel">
                <figure>
                    <small>International Shipping</small>
                    <strong>$20.00</strong>
                </figure>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    order: state.ecomerce.order,
});

export default connect(mapStateToProps)(ModulePaymentShipping);
