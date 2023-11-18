import React, { useState } from 'react';
import { Card, Button, Progress, notification, Result } from 'antd';
import { formatDate, formatNaira } from '~/utilities/formatNaira';
import DepositModal from './modules/DepositModal';
import { getPackages, makeContribution } from '~/services/package.service';
import { useAppContext } from '~/context/appContext';
import CreateDsPackageModal from './modules/CreateDsPackageModal';
import { useAuth } from '~/context/authContext';

const DSPackages = ({ createAccount }) => {
    const { currentUser } = useAuth();
    const { customerData, dsPackages, setDsPackages } = useAppContext();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
    const [
        isCreatePackageModalVisible,
        setIsCreatePackageModalVisible,
    ] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenDepositModal = (dspackage) => {
        setSelectedPackage(dspackage);
        setIsDepositModalVisible(true);
    };

    const handleCloseDepositModal = () => {
        setIsDepositModalVisible(false);
    };

    const handleOpenCreatePackageModal = () => {
        setIsCreatePackageModalVisible(true);
    };

    const handleCloseCreatePackageModal = () => {
        setIsCreatePackageModalVisible(false);
    };

    const fetchPackages = async () => {
        const response = await getPackages(currentUser.id);
        setDsPackages(response);
    };

    const handleDeposit = async (depositAmount) => {
        const depositData = {
            target: selectedPackage.target,
            accountNumber: selectedPackage.accountNumber,
            amount: parseFloat(depositAmount),
        };
console.log(depositAmount);
        try {
            setLoading(true);
            await makeContribution(selectedPackage.id, depositData);

            notification.open({
                message: 'Deposit successful!',
                duration: 200,
            });
            setLoading(false);
            handleCloseDepositModal();
            fetchPackages();
        } catch (error) {
            console.error(error);
            notification.error({
                message:
                    error.response?.data?.message ||
                    'An error occurred while making contribution.',
                duration: 200,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <h4>Packages</h4>
                    <p>Lists of user's packages</p>
                </div>

                {!customerData ? (
                    <Button type="primary" onClick={createAccount}>
                        Create Account
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        onClick={handleOpenCreatePackageModal}>
                        Create Package
                    </Button>
                )}
            </div>
            <hr style={{ color: '#333' }} />
            <div className="packagesContainer">
                {dsPackages && dsPackages.length !== 0 ? (
                    dsPackages.map((p) => (
                        <Card key={p.id} className="packageCard">
                            <h4 className="text-center">{p.target}</h4>
                            <p>
                                Total Contribution:{' '}
                                {formatNaira(p.totalContribution)}
                            </p>
                            <p>
                                Target Amount: {formatNaira(p.amountPerDay)} /
                                Day
                            </p>
                            <p>Start Date: {formatDate(p.startDate)}</p>
                            <Progress
                                percent={((p.totalCount / 31) * 100).toFixed(2)}
                                status="active"
                                showInfo
                            />
                            <div className="buttonsContainer">
                                <Button
                                    type="danger"
                                    className="transferButton">
                                    Transfer
                                </Button>
                                <Button
                                    type="success"
                                    className="depositButton"
                                    onClick={() => handleOpenDepositModal(p)}>
                                    Deposit
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Result status="warning" title="No package Found.">
                        <a
                            className="ps-btn"
                            href="/account/packages/create-ds-package">
                            Create one
                        </a>
                    </Result>
                )}

                {selectedPackage && (
                    <DepositModal
                        visible={isDepositModalVisible}
                        onCancel={handleCloseDepositModal}
                        dsPackage={selectedPackage}
                        onDeposit={handleDeposit}
                    />
                )}

                <CreateDsPackageModal
                    visible={isCreatePackageModalVisible}
                    onCancel={handleCloseCreatePackageModal}
                    customerData={customerData}
                    onPackageCreated={handleCloseCreatePackageModal}
                />
            </div>
        </>
    );
};

export default DSPackages;
