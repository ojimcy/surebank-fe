import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';

const { Option } = Select;

const FormCheckoutInformation = () => {
    const [shippingMethod, setShippingMethod] = useState('');
    const router = useRouter();

    const handleContinue = () => {
        router.push('/account/shipping');
    };

    const handleShippingMethodChange = (value) => {
        setShippingMethod(value);
    };

    return (
        <Form className="ps-form__billing-info" onFinish={handleContinue}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: false,
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
                            required: false,
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
                            required: false,
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
                                    required: false,
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
                    name="productId"
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
