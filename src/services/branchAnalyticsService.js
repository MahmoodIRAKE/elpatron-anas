import axiosInstance from '../config/axios';

// Get branch analytics
export const getBranchAnalytics = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/branch-analytics?${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
