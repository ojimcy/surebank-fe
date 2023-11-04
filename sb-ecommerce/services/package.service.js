import axiosService from '~/repositories/axiosService';

export const getPackages = async (userId) => {
    const response = await axiosService.get(
        `daily-savings/package?userId=${userId}`
    );
    return response.data;
};

export const makeContribution = async (packageId, depositData) => {
    const response = await axiosService.post(
        `/daily-savings/make-contribution/?packageId=${packageId}`,
        depositData
    );
    return response.data;
};

export const getUserAccount = async (userId, accountType) => {
    const response = await axiosService.get(
        `/accounts/${userId}`
    );
    return response.data;
};
