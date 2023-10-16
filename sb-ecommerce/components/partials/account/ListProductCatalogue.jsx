import React, { useEffect, useState } from 'react';
import { Result, Button, Modal, notification } from 'antd';
import {
    deleteProductCatalogue,
    getMyProductCatalogue,
} from '~/services/product.service';
import DashboardLayout from '~/components/layouts/DashboardLayout';
import ProductCatDetailsModal from './modules/ProductCatDetailsModal';

const ListProductCatalogue = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getMyProductCatalogue();
            setProducts(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleShowDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleHideDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(false);
    };

    const handleShowDetails = (product) => {
        setSelectedProduct(product);
        setDetailsModal(true);
    };

    const handleHideDetails = (product) => {
        setSelectedProduct(product);
        setDetailsModal(false);
    };

    const handleDelete = async () => {
        try {
            if (selectedProduct) {
                await deleteProductCatalogue(selectedProduct.id);
                notification.success({
                    message: 'Product catalogue deleted successfully!!!',
                    duration: 200,
                });
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product catalogue:', error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                notification.error({
                    message: 'Delete Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Delete Failed',
                    description:
                        'An error occurred while processing your product. Please try again later.',
                });
            }
        } finally {
            handleHideDelete(false);
        }
    };

    return (
        <>
            <DashboardLayout>
                <div className="ps-form__header d-flex justify-content-between align-item-center mb-5">
                    <h3>Product Catalogue</h3>
                    <a href="/account/create-product-catalogue">
                        Add new product
                    </a>
                </div>
                {products && products.length > 0 ? (
                    <table className="table  ps-table--shopping-cart table-responsive">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Sales Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        {product.title}{' '}
                                        <img
                                            style={{ width: '50px' }}
                                            src={product.featuredImage}
                                            alt={product.title}
                                        />
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.salesPrice}</td>
                                    <td>{product.quantity}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button
                                            className="mr-2"
                                            type="danger"
                                            onClick={() =>
                                                handleShowDelete(product)
                                            }>
                                            Delete
                                        </Button>
                                        <Button
                                            className="mr-2"
                                            type="primary"
                                            onClick={() =>
                                                handleShowDetails(product)
                                            }>
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Result status="warning" title="No product Found." />
                )}
            </DashboardLayout>

            <ProductCatDetailsModal
                confirmModalVisible={detailsModal}
                selectedProduct={selectedProduct}
                onCancel={handleHideDetails}
                onOk={handleHideDetails}
            />

            <Modal
                title="Delete Product"
                visible={showDeleteModal}
                onOk={handleDelete}
                onCancel={() => setShowDeleteModal(false)}>
                Do you want to delete
                {selectedProduct ? selectedProduct.title : ''}?
            </Modal>
        </>
    );
};

export default ListProductCatalogue;
