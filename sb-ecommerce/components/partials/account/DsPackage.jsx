import React, { useState } from 'react';
import { Card, Button, Progress, notification, Result } from 'antd';
import { formatDate, formatNaira } from '~/utilities/formatNaira';
import DepositModal from './modules/DepositModal';
import { makeContribution } from '~/services/package.service';

const DSPackages = ({ packages }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenDepositModal = (dspackage) => {
        setSelectedPackage(dspackage);
        setIsDepositModalVisible(true);
    };

    const handleCloseDepositModal = () => {
        setIsDepositModalVisible(false);
    };

    const handleDeposit = async (depositAmount) => {
        const depositData = {
            target: selectedPackage.target,
            accountNumber: selectedPackage.accountNumber,
            amount: parseFloat(depositAmount),
        };

        try {
            setLoading(true);
            await makeContribution(selectedPackage.id, depositData);

            notification.open({
                message: 'Deposit successful!',
                duration: 200,
            });
            setLoading(false);
            handleCloseDepositModal();
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
        <div className="packagesContainer">
            {packages && packages.length !== 0 ? (
                packages.map((p) => (
                    <Card key={p.id} className="packageCard">
                        <h4 className="text-center">{p.target}</h4>
                        <p>
                            Total Contribution:{' '}
                            {formatNaira(p.totalContribution)}
                        </p>
                        <p>
                            Target Amount: {formatNaira(p.amountPerDay)} / Day
                        </p>
                        <p>Start Date: {formatDate(p.startDate)}</p>
                        <Progress
                            percent={((p.totalCount / 31) * 100).toFixed(2)}
                            status="active"
                            showInfo
                        />
                        <div className="buttonsContainer">
                            <Button type="danger" className="transferButton">
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
                <Result status="warning" title="No product Found." >
                    <a className='ps-btn' href='/account/create-package'>Create one</a>
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
        </div>
    );
};

export default DSPackages;
