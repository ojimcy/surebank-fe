import axiosService from '~/repositories/axiosService';

export const updateProfile = async (userData) => {
    const response = await axiosService.patch('/users', userData);
    return response.data;
};
