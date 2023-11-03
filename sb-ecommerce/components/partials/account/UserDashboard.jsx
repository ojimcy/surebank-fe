import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { formatNaira } from '~/utilities/formatNaira';
import DSPackages from './DsPackage';
import { getPackages } from '~/services/package.service';
import { useAuth } from '~/context/authContext';

const { TabPane } = Tabs;

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('sbAccount');
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        try {
            if (currentUser) {
                const fetchPackages = async () => {
                    const response = await getPackages(currentUser?.id);
                    setPackages(response);
                };
                fetchPackages();
            }
        } catch (error) {
            console.error(error);
        }
    }, [currentUser?.id]);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="dashboard-container">
            <div className="account-info d-flex justify-content-between align-items-center mt-5">
                <div className="balance">
                    <p className="font-weight-bold">
                        Balance: {formatNaira(1000)}
                    </p>
                </div>

                <a
                    className="ps-btn ps-btn--green"
                    href="#"
                    onClick={(e) => handleBuyNow(e)}>
                    Request Cash
                </a>
            </div>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="SB Account" key="sbAccount">
                    <DSPackages packages={packages} />
                </TabPane>
                <TabPane tab="DS Account" key="dsAccount">
                    <p>DS Account content goes here.</p>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Dashboard;
