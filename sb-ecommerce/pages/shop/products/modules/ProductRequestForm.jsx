import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Divider, notification } from 'antd';
import {
    createProduct,
    getBrands,
    getCategories,
} from '~/services/product.service';

const ProductRequestForm = () => {
    const [form] = Form.useForm();
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductsCategories = async () => {
        const response = await getCategories();
        setCategories(response);
        console.log(categories);
    };

    const fetchProductsBrands = async () => {
        const response = await getBrands();
        setBrands(response.results);
    };

    useEffect(() => {
        fetchProductsCategories();
        fetchProductsBrands();
    }, []);

    const toggleAdditionalFields = () => {
        setShowAdditionalFields(!showAdditionalFields);
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            await createProduct(values);
            setLoading(false);
            notification.success({ message: 'Product request successfully!' });
            form.resetFields();
        } catch (error) {
            console.error('Error creating product request:', error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                notification.error({
                    message: 'Product Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Product Request Failed',
                    description:
                        'An error occurred while processing your request. Please try again later.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '780px', margin: 'auto', padding: '20px' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ maxWidth: '600px', margin: 'auto' }}>
                <div className="ps-form__header">
                    <h3>Product Request Form</h3>
                </div>
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter product name',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter product name"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter product selling price',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter product selling price"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="originalPrice"
                                    label="Original Price"
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                'Please enter discount price',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter discounted price"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="slug"
                                    label="Slug"
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                'Please enter product slug',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="System friendly name"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="stock"
                                    label="Stock"
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                'Please enter product stock',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="number"
                                        placeholder="Enter Number of product in stock"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter product description',
                                        },
                                    ]}>
                                    <Input.TextArea
                                        className="form-control"
                                        placeholder="Enter product description"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="images"
                                    label="Images"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter image',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        placeholder="Enter image url"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="tags"
                                    label="Tags"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please enter tags',
                                        },
                                    ]}>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="categoryId"
                                    label="Category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select a category',
                                        },
                                    ]}>
                                    <Select placeholder="Select a category">
                                        {categories?.map((category) => (
                                            <Option
                                                key={category.id}
                                                value={category.id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <Form.Item
                                    name="brand"
                                    label="Brand"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select a brand',
                                        },
                                    ]}>
                                    <Select placeholder="Select a brand">
                                        {brands?.map((brand) => (
                                            <Option
                                                key={brand.id}
                                                value={brand.id}>
                                                {brand.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    <div className="form-group submit">
                        <button className="ps-btn">Submit</button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ProductRequestForm;
