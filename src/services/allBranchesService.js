import axiosInstance from '../config/axios';

// Get all branches
export const getAllBranches = async () => {
  try {
    const response = await axiosInstance.get('/branches');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
