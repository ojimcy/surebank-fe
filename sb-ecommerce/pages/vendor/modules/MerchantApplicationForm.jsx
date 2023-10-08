import React, { useState } from 'react';
import { Form, Input, Button, Upload, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { createMerchant } from '~/services/merchant.service';

const { Dragger } = Upload;

const MerchantApplicationForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            setLoading(true);
            await createMerchant(values);
            setLoading(false);
            notification.success({ message: 'Merchant request successfully!' });
        } catch (error) {
            console.error('Error creating merchant:', error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                notification.error({
                    message: 'Merchant Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Merchant Request Failed',
                    description:
                        'An error occurred while processing your request. Please try again later.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            style={{ maxWidth: '600px', margin: 'auto' }}>
            <Form.Item
                name="storeName"
                label="Store Name"
                rules={[
                    { required: true, message: 'Please enter store name' },
                ]}>
                <Input type="text" placeholder="Enter store name" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the store email',
                    },
                ]}>
                <Input type="email" placeholder="Enter store email" />
            </Form.Item>

            <Form.Item
                name="storePhoneNumber"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the store phone number',
                    },
                ]}>
                <Input type="text" placeholder="Enter store phone number" />
            </Form.Item>

            <Form.Item
                name="storeAddress"
                label="Store Address"
                rules={[{ required: true, message: 'Please enter address' }]}>
                <Input type="text" placeholder="Enter store address" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Short Description"
                rules={[
                    {
                        required: false,
                        message: 'Please enter short description',
                    },
                ]}>
                <Input
                    type="text"
                    placeholder="Enter store short description"
                />
            </Form.Item>

            <Form.Item
                name="website"
                label="Website"
                rules={[
                    { required: false, message: 'Please enter website url' },
                ]}>
                <Input type="text" placeholder="Enter store website url" />
            </Form.Item>

            <Form.Item
                name="logo"
                label="Logo"
                rules={[
                    { required: false, message: 'Please enter logo url' },
                ]}>
                <Input type="text" placeholder="Enter store logo url" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Apply
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MerchantApplicationForm;
