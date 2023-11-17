import React, { useEffect, useState } from 'react';
import { Button, Tabs, notification } from 'antd';
import { formatNaira } from '~/utilities/formatNaira';
import DSPackages from './DsPackage';
import { getPackages, getUserAccount } from '~/services/package.service';
import { useAuth } from '~/context/authContext';
import { useAppContext } from '~/context/appContext';
import CreateAccountModal from './modules/CreateAccountModal';
import { createAccount, getBranches } from '~/services/user.service';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { TabPane } = Tabs;

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { packages, setPackages } = useAppContext();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('sb');
    const [accountType, setAccountType] = useState('');
    const [
        isCreateAccountModalVisible,
        setCreateAccountModalVisible,
    ] = useState(false);
    const [customerData, setCustomerData] = useState({});

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
    }, [currentUser?.id, customerData]);

    const handleTabChange = (tab) => {
        setAccountType(tab);
        setActiveTab(tab);
    };

    const handleCreateAccount = () => {
        setCreateAccountModalVisible(true);
    };

    const handleCancelCreateAccount = () => {
        setCreateAccountModalVisible(false);
    };

    const onFinishCreateAccount = async (values) => {
        try {
            values.email = currentUser?.email;
            await createAccount(values);
            notification.open({
                message: 'Account created successfully!',
                duration: 200,
            });
            router.push(`/account/dashboard`);
            setCreateAccountModalVisible(false);
        } catch (error) {
            notification.error({
                message: 'Error in creating account',
                description: error.message,
                duration: 200,
            });
        }
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
                    <Button type="primary" onClick={handleCreateAccount}>
                        Create Account
                    </Button>
                ) : (
                    <Link href="/account/packages/create-ds-package">
                        <Button type="primary">Create Package</Button>
                    </Link>
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

            {/* Create Account Modal */}
            <CreateAccountModal
                visible={isCreateAccountModalVisible}
                onCancel={handleCancelCreateAccount}
                onFinish={onFinishCreateAccount}
                currentUser={currentUser}
            />
        </div>
    );
};

export default Dashboard;
