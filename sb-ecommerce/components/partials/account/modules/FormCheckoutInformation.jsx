import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, notification } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { setOrderDetails, setShippingAddress } from '~/store/ecomerce/action';
import Cookies from 'js-cookie';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useEcomerce from '~/hooks/useEcomerce';
import { useAuth } from '~/context/authContext';
import { createOrder } from '~/services/order.service';

const { Option } = Select;

const FormCheckoutInformation = ({ dispatch, ecomerce }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { currentUser } = useAuth();

    const { products, getProducts } = useEcomerce();
    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    let amount;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
    }
    // Define initial form values
    const initialFormValues = {
        phoneNumber: '',
        fullName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        shippingMethod: '',
        paymentMethod: '',
    };

    // Check if shippingAddress exists in cookies
    const shippingAddressFromCookies = Cookies.getJSON('shippingAddress');

    // Set the initial form values from cookies if available, else use defaults
    const initialValues = shippingAddressFromCookies || initialFormValues;

    useEffect(() => {
        // Set the initial values for the form
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    const handleContinue = async () => {
        const formValues = form.getFieldsValue();

        const userId = currentUser ? currentUser.id : null;
        const productDetails = products || [];

        const shippingAddress = {
            phoneNumber: formValues.phoneNumber,
            fullName: formValues.fullName,
            address: formValues.address,
            apartment: formValues.apartment,
            city: formValues.city,
            postalCode: formValues.postalCode,
        };

        // Set the shipping address in the Redux store
        dispatch(setShippingAddress(formValues));

        try {
            const orderData = {
                user: userId,
                orderItems: productDetails.map((product) => ({
                    name: product.name,
                    quantity: product.quantity,
                    image: product.featuredImage,
                    price: product.price,
                })),
                shippingAddress: shippingAddress,
                totalPrice: amount,
                shippingMethod: formValues.shippingMethod,
                paymentMethod: formValues.paymentMethod,
            };
            const order = await createOrder(orderData);
            console.log(order);
            // Dispatch an action to save the order
            dispatch(setOrderDetails(order));

            // Save to cookies
            Cookies.set('order', order, {
                path: '/',
                expires: 24 * 1,
            });
            router.push('/account/shipping');
        } catch (error) {
            notification.error({
                message:
                    error.response?.data?.message ||
                    'An error occurred while making contribution.',
                duration: 200,
            });
        }
    };

    return (
        <Form
            className="ps-form__billing-info"
            form={form}
            onFinish={handleContinue}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Enter mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Phone number"
                    />
                </Form.Item>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="form-group">
                <Form.Item
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your full name!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Full Name"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="apartment"
                    rules={[
                        {
                            required: false,
                            message: 'Enter an Apartment!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </Form.Item>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter a city!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="city"
                                placeholder="City"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <Form.Item
                            name="postalCode"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter a postal oce!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="postalCode"
                                placeholder="Postal Code"
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="shippingMethod"
                    rules={[
                        {
                            required: true,
                            message: 'Please select delivery method!',
                        },
                    ]}>
                    <Select type="select" placeholder="Select Delivery method">
                        <Option value="home">Home Delivery</Option>
                        <Option value="pickUp">Pickup Station</Option>
                    </Select>
                </Form.Item>
            </div>

            <div className="form-group">
                <Form.Item
                    name="paymentMethod"
                    rules={[
                        {
                            required: true,
                            message: 'Please prefered payment method!',
                        },
                    ]}>
                    <Radio.Group className="vertical-radio-group">
                        <Radio value="paypal">Paypal</Radio>
                        <Radio value="wallet">SB Account</Radio>
                    </Radio.Group>
                </Form.Item>
            </div>
            <div className="form-group">
                <div className="ps-checkbox">
                    <input
                        className="form-control"
                        type="checkbox"
                        id="save-information"
                    />
                    <label htmlFor="save-information">
                        Save this information for next time
                    </label>
                </div>
            </div>
            <div className="ps-form__submit">
                <Link href="/account/shopping-cart">
                    <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to shopping cart
                    </a>
                </Link>
                <div className="ps-block__footer">
                    <button className="ps-btn">Continue to shipping</button>
                </div>
            </div>
        </Form>
    );
};

export default connect((state) => state)(FormCheckoutInformation);
