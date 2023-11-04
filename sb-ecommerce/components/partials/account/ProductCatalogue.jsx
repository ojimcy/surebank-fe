import { Form, Input, Select, Spin, notification, Upload, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
    createProductCatalogue,
    getProducts,
    uploadFile,
} from '~/services/product.service';
import { baseURL } from '~/repositories/axiosService';

const AddProductCatalogue = () => {
    const Router = useRouter();
    const [products, setProducts] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const results = await getProducts();
                setProducts(results.results);
            };
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleSubmit = async (values) => {
        setSubmitting(true);
        try {
            await createProductCatalogue(values);
            notification.success({
                message: 'Product added Successfully!',
            });
            Router.push('/account/product-catalogue');
        } catch (error) {
            notification.error({
                message: 'Failed to add product to catalogue',
                description: error.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const onFileChange = (info) => {
        if (info.file.status === 'done') {
            setFile(info.file.originFileObj);
        }
    };

    const uploadProps = {
        name: 'file',
        action: `${baseURL}/upload`,
        onChange: onFileChange,
    };

    return (
        <Form className="ps-form--account-setting" onFinish={handleSubmit}>
            <div className="ps-form__header d-flex justify-content-between align-item-center mb-5">
                <h3>Product Catalogue</h3>
                <a href="/account/products/requests/create">
                    Request New Product
                </a>
            </div>
            <div className="ps-form__content">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="productId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select product!',
                                    },
                                ]}>
                                <Select
                                    type="select"
                                    placeholder="Select Product">
                                    <option>Select Product</option>
                                    {products &&
                                        products.map((product) => (
                                            <option
                                                key={product.key}
                                                value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input product title!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Title"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="images"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select image!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Images"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="featuredImage"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please upload a featured image!',
                                    },
                                ]}>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>
                                        Upload Featured Image
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="salesPrice"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input sales price!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Sales price"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input product price!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Price"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input quantity!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Quantity"
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Form.Item
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input product description!',
                                    },
                                ]}>
                                <TextArea
                                    className="form-control"
                                    type="textarea"
                                    placeholder="Description"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="form-group submit">
                    <div className="form-group submit">
                        <button
                            type="submit"
                            className="ps-btn ps-btn--fullwidth"
                            disable={submitting}>
                            {submitting ? (
                                <Spin tip="Submitting..." />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default AddProductCatalogue;
