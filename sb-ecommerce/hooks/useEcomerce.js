import React, { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
    setCompareItems,
    setWishlistTtems,
    setCartItems,
    createOrder,
    setShippingAddress,
    setOrderDetails,
} from '~/store/ecomerce/action';
import {
    addToCart,
    clearCart,
    getCartItems,
    removeCart,
} from '~/services/product.service';

export default function useEcomerce() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState([]);

    return {
        loading,
        cartItemsOnCookie,
        products,
        cart,

        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (payload && payload.length > 0) {
                let queries = '';
                payload.forEach((item) => {
                    if (queries === '') {
                        queries = `ids=${item.cartItem.productCatalogueId}`;
                    } else {
                        queries =
                            queries +
                            `&ids=${item.cartItem.productCatalogueId}`;
                    }
                });
                const responseData = await ProductRepository.getProductsByIds(
                    queries
                );
                if (responseData && responseData.length > 0) {
                    if (group === 'cart') {
                        let cartItems = responseData;
                        payload.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
                            if (existItem) {
                                existItem.quantity = item.quantity;
                            }
                        });

                        setProducts(cartItems);
                    } else {
                        setProducts(responseData);
                    }
                    setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
                }
            } else {
                setLoading(false);
                setProducts([]);
            }
        },

        getCart: async () => {
            try {
                const updatedCartItems = await getCartItems();
                setCart(updatedCartItems);
                return updatedCartItems;
            } catch (error) {
                console.error('Error fetching cart items:', error.message);
            }
        },

        increaseQty: (payload, currentCart) => {
            let cart = [];
            if (currentCart) {
                cart = currentCart;
                const existItem = cart.find((item) => item.id === payload.id);
                if (existItem) {
                    existItem.quantity = existItem.quantity + 1;
                }
                setCookie('cart', cart, { path: '/' });
                dispatch(setCartItems(cart));
            }
            return cart;
        },

        decreaseQty: (payload, currentCart) => {
            let cart = [];
            if (currentCart) {
                cart = currentCart;
                const existItem = cart.find((item) => item.id === payload.id);
                if (existItem) {
                    if (existItem.quantity > 1) {
                        existItem.quantity = existItem.quantity - 1;
                    }
                }
                setCookie('cart', cart, { path: '/' });
                dispatch(setCartItems(cart));
            }
            return cart;
        },

        addItem: async (newItem, items, group) => {
            try {
                // Call the addToCart service to add the product to the cart
                const cartItem = await addToCart({
                    productCatalogueId: newItem.id,
                    quantity: newItem.quantity,
                });

                const updatedCartItems = await getCartItems();
                console.log(updatedCartItems);
                setCart(updatedCartItems);

                let newItems = [];
                if (items) {
                    newItems = items;
                    const existItem = items.find(
                        (item) => item.id === newItem.id
                    );
                    if (existItem) {
                        if (group === 'cart') {
                            existItem.quantity += newItem.quantity;
                        }
                    } else {
                        newItems.push(cartItem);
                    }
                } else {
                    newItems.push(cartItem);
                }
                if (group === 'cart') {
                    setCookie('cart', newItems, { path: '/' });
                    dispatch(setCartItems(updatedCartItems));
                }
                if (group === 'wishlist') {
                    setCookie('wishlist', newItems, { path: '/' });

                    dispatch(setWishlistTtems(newItems));
                }

                if (group === 'compare') {
                    setCookie('compare', newItems, { path: '/' });
                    dispatch(setCompareItems(newItems));
                }
                return newItems;
            } catch (error) {
                console.error('Error adding item to cart:', error.message);
            }
        },

        removeItem: async (selectedItem, items, group) => {
            await removeCart(selectedItem.productCatalogueId);

            let currentItems = items;
            if (currentItems.length > 0) {
                const index = currentItems.findIndex(
                    (item) => item.id === selectedItem.productCatalogueId
                );
                currentItems.splice(index, 1);
            }
            if (group === 'cart') {
                setCookie('cart', currentItems, { path: '/' });

                dispatch(setCartItems(currentItems));
            }

            if (group === 'wishlist') {
                setCookie('wishlist', currentItems, { path: '/' });
                dispatch(setWishlistTtems(currentItems));
            }

            if (group === 'compare') {
                setCookie('compare', currentItems, { path: '/' });
            }
        },

        removeItems: async (group) => {
            await clearCart();
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'compare') {
                setCookie('compare', [], { path: '/' });
                dispatch(setCompareItems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },

        createOrder: (orderDetails) => {
            dispatch(createOrder(orderDetails));
        },

        setShippingAddress: (address) => {
            dispatch(setShippingAddress(address));
        },

        setOrderDetails: (order) => {
            dispatch(setOrderDetails(order));
        },
    };
}
