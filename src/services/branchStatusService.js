import axiosInstance from '../config/axios';

// Get single branch status
export const getBranchStatus = async (branchId) => {
  try {
    const response = await axiosInstance.get(`/branch-status/${branchId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all branches status
export const getAllBranchesStatus = async () => {
  try {
    const response = await axiosInstance.get('/branches-status');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
