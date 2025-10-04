import axiosInstance from '../config/axios';

// Generate orders PDF
export const generateOrdersPDF = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/orders-pdf?${queryString}`, {
      responseType: 'blob', // Important for PDF files
    });
    
    // Create blob and download
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Generate filename
    const year = params.year || new Date().getFullYear();
    const month = params.month ? `-${params.month}` : '';
    link.download = `orders-report-${year}${month}.pdf`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true, message: 'PDF generated successfully' };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
