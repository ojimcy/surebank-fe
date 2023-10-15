import React, { Component } from 'react';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import DashboardLayout from '~/components/layouts/DashboardLayout';

const UserInformation = () => {
    return (
        <DashboardLayout>
            <FormChangeUserInformation />
        </DashboardLayout>
    );
};

export default UserInformation;
