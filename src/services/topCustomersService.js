import axiosInstance from '../config/axios';

// Get top customers
export const getTopCustomers = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/top-customers?${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
