import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { formatNaira } from '~/utilities/formatNaira';

const MiniCart = ({ ecomerce }) => {
    const { removeItem, cart, getCart } = useEcomerce();

    function handleRemoveItem(e) {
        e.preventDefault();
        removeItem(ecomerce.cartItems, 'cart');
    }

    useEffect(() => {
        getCart();
    }, []); 

    let cartItemsView;
    if (cart && cart.length !== 0) {
        const amount = cart.cart.total;
        const productItems = cart.cartItems.map((item) => {
            return (
                <ProductOnCart cart={item} product={item.product} key={item.id}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e)}>
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>
                            {amount ? formatNaira(amount) : formatNaira(0)}
                        </strong>
                    </h3>
                    <figure>
                        <Link href="/account/shopping-cart">
                            <a className="ps-btn">View Cart</a>
                        </Link>
                        <Link href="/account/checkout">
                            <a className="ps-btn">Checkout</a>
                        </Link>
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>No products in cart</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2"></i>
                <span>
                    <i>{cart.cartItems ? cart.cartItems.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default connect((state) => state)(MiniCart);
