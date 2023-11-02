import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button, notification } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getOrderById, updateOrder } from '~/services/order.service';
import PageContainer from '~/components/layouts/PageContainer';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const { Option } = Select;

const OrderUpdate = () => {
    const router = useRouter();
    const { id } = router.query;
    const [form] = Form.useForm();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getOrder(id) {
        setLoading(true);
        const responseData = await getOrderById(id);
        if (responseData) {
            setOrder(responseData);
            form.setFieldsValue(responseData); // Set the initial form values
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrder(id);
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            await updateOrder(order.id, values);
            notification.success({
                message: 'Order updated successfully',
                duration: 2,
            });
            setTimeout(() => {
                router.push(`/account/orders/${order.id}`);
            }, 1500);
        } catch (error) {
            console.error(error);
            notification.error({
                message:
                    error.response?.data?.message || 'Error updating order',
                duration: 2,
            });
        }
    };

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Update Order',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Update Order">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="ps-checkout ps-section--shopping">
                    <div className="container">
                        <div className="ps-section__header">
                            <h1>Update Order</h1>
                        </div>
                        {order && (
                            <div className="ps-section__content">
                                <div className="ps-form--checkout">
                                    <div className="ps-form__content">
                                        <Form
                                            className="ps-form__billing-info"
                                            form={form}
                                            initialValues={
                                                order.shippingAddress
                                            }
                                            onFinish={handleSubmit}>
                                            <h3 className="ps-form__heading">
                                                Contact information
                                            </h3>
                                            <div className="form-group">
                                                <Form.Item
                                                    name={[
                                                        'shippingAddress',
                                                        'phoneNumber',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter mobile phone number!',
                                                        },
                                                    ]}>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Phone number"
                                                    />
                                                </Form.Item>
                                            </div>
                                            <h3 className="ps-form__heading">
                                                Shipping address
                                            </h3>
                                            <div className="form-group">
                                                <Form.Item
                                                    name={[
                                                        'shippingAddress',
                                                        'fullName',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter your full name!',
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
                                                    name={[
                                                        'shippingAddress',
                                                        'address',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter an address!',
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
                                                    name={[
                                                        'shippingAddress',
                                                        'apartment',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message:
                                                                'Enter an Apartment!',
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
                                                            name={[
                                                                'shippingAddress',
                                                                'city',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Enter a city!',
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
                                                            name={[
                                                                'shippingAddress',
                                                                'postalCode',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: false,
                                                                    message:
                                                                        'Enter a postal oce!',
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
                                                            message:
                                                                'Please select delivery method!',
                                                        },
                                                    ]}>
                                                    <Select
                                                        type="select"
                                                        placeholder="Select Delivery method">
                                                        <Option value="home">
                                                            Home Delivery
                                                        </Option>
                                                        <Option value="pickUp">
                                                            Pickup Station
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            <div className="form-group">
                                                <Form.Item
                                                    name="paymentMethod"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please prefered payment method!',
                                                        },
                                                    ]}>
                                                    <Radio.Group className="vertical-radio-group">
                                                        <Radio value="paypal">
                                                            Paypal
                                                        </Radio>
                                                        <Radio value="wallet">
                                                            SB Account
                                                        </Radio>
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
                                                        Save this information
                                                        for next time
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
                                                    <button className="ps-btn">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default OrderUpdate;
