import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { formatNaira } from '~/utilities/formatNaira';
import DSPackages from './DsPackage';
import { getPackages, getUserAccount } from '~/services/package.service';
import { useAuth } from '~/context/authContext';
import { useAppContext } from '~/context/appContext';

const { TabPane } = Tabs;

const Dashboard = () => {
    const { currentUser } = useAuth();
    const {
        customerData,
        setCustomerData,
        packages,
        setPackages,
    } = useAppContext();
    const [activeTab, setActiveTab] = useState('sb');
    const [accountType, setAccountType] = useState('');

    const fetchUserAccount = async () => {
        const account = await getUserAccount(currentUser.id, accountType);
        setCustomerData(account);
    };

    const fetchPackages = async () => {
        const response = await getPackages(currentUser.id);
        setPackages(response);
    };

    useEffect(() => {
        if (currentUser) {
            fetchPackages();
            fetchUserAccount();
        }
    }, [currentUser?.id]);

    const handleTabChange = (tab) => {
        setAccountType(tab);
        setActiveTab(tab);
    };

    return (
        <div className="dashboard-container">
            <div className="account-info d-flex justify-content-between align-items-center mt-5">
                <div className="balance d-flex align-items-center">
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
            <hr style={{ color: '#333', marginBottom: '15px' }} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <h4>Packages</h4>
                    <p>Lists of user's packages</p>
                </div>

                {!customerData || Object.keys(customerData).length === 0 ? (
                    <Button type="primary">Create Account</Button>
                ) : (
                    <NavLink to="/account/packages/create-ds-package">
                        <Button type="primary">Create Package</Button>
                    </NavLink>
                )}
            </div>
            <hr style={{ color: '#333' }} />

            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="SB Account" key="sb">
                    <DSPackages packages={packages} />
                </TabPane>
                <TabPane tab="DS Account" key="ds">
                    <p>DS Account content goes here.</p>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Dashboard;
