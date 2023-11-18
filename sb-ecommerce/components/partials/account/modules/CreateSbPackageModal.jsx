import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, notification, Spin } from 'antd';
import axiosService from '~/repositories/axiosService';
import { useAppContext } from '~/context/appContext';
import { formatNaira } from '~/utilities/formatNaira';
import { createDsPackage } from '~/services/package.service';

const { Option } = Select;

const CreateSbPackageModal = ({ visible, onCancel }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const { customerData } = useAppContext();

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axiosService.get('products/catalogue');
                setProducts(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelection = (value, option) => {
        setSelectedProduct(value);
        const selectedProductDetails = products.find(
            (product) => product.id === value
        );
        setProductDetails(selectedProductDetails);
    };

    // Handle form submission
    const onFinish = async (values) => {
        try {
            if (selectedProduct) {
                values.product = selectedProduct;
            }
            await createDsPackage(values);
            notification.success({
                message: 'Package created successfully!',
                duration: 2,
            });
            onClose();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                // Backend error with a specific error message
                const errorMessage = error.response.data.message;
                notification.error({
                    message: 'Something went wrong. Please try again later.',
                    description: errorMessage,
                    duration: 2,
                });
            } else {
                // Network error or other error
                notification.error({
                    message: 'Something went wrong. Please try again later.',
                    duration: 2,
                });
            }
        }
    };

    return (
        <Modal
            title="Create SB Package"
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <Form onFinish={onFinish}>
                <Form.Item
                    label="Account Number"
                    name="accountNumber"
                    initialValue={customerData?.accountNumber}
                    rules={[
                        {
                            required: true,
                            message: 'Account number is required',
                        },
                    ]}>
                    <Input type="text" disabled />
                </Form.Item>

                <Form.Item
                    label="Select Product"
                    name="product"
                    rules={[
                        {
                            required: true,
                            message: 'Select a product',
                        },
                    ]}>
                    <Select
                        onChange={handleProductSelection}
                        placeholder="Select a product">
                        {products.map((product) => (
                            <Option key={product.id} value={product.id}>
                                {product.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {selectedProduct && (
                    <>
                        <Spin spinning={loading}>
                            <img
                                src={productDetails?.image} // TODO: Replace with the actual image source
                                alt={productDetails?.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '10px',
                                }}
                            />
                            <div>
                                <p>{productDetails?.name}</p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}>
                                    {productDetails && productDetails.price
                                        ? formatNaira(productDetails.price)
                                        : 'Price not available'}
                                </p>
                            </div>
                        </Spin>
                    </>
                )}

                <Form.Item>
                    <button type="submit" className="ps-btn">
                        Create Package
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateSbPackageModal;
