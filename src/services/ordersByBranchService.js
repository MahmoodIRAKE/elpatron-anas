import axiosInstance from '../config/axios';

// Get orders by branch with advanced filtering
export const getOrdersByBranch = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/orders-by-branch?${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
