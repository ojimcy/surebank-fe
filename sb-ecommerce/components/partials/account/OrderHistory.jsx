import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import Link from 'next/link';
import DashboardLayout from '~/components/layouts/DashboardLayout';
import { orderHistory } from '~/services/order.service';
import { useAuth } from '~/context/authContext';
import { formatNaira } from '~/utilities/formatNaira';

const OrderHistory = () => {
    const { currentUser } = useAuth();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const orders = await orderHistory(currentUser.id);
            if (orders) {
                setTableData(orders);
            }
        };
        fetchOrderHistory();
    }, [currentUser]);

    const tableColumn = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            render: (text, record) => {
                return text.substring(20, 24);
            },
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => {
                const orderDate = new Date(text);
                return orderDate.toLocaleDateString();
            },
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            render: (text, record) => {
                return formatNaira(text);
            },
        },
        {
            title: 'Paid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (text, record) => {
                return text ? `paid at ${order.paidAt}` : 'Not Paid';
            },
        },
        {
            title: 'Delivered',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            render: (text, record) => (
                <Tag color={text ? 'green' : 'volcano'}>
                    {text ? 'Yes' : 'No'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Link href={`/account/orders/${record.id}`}>
                    <a>Details</a>
                </Link>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <Table
                columns={tableColumn}
                dataSource={tableData}
                rowKey={(record) => record.id}
            />
        </DashboardLayout>
    );
};

export default OrderHistory;
