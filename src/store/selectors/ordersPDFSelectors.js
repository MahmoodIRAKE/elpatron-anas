// Orders PDF Selectors
export const selectOrdersPDF = (state) => state.ordersPDF;
export const selectPDFLoading = (state) => state.ordersPDF.loading;
export const selectPDFError = (state) => state.ordersPDF.error;
export const selectLastGeneratedParams = (state) => state.ordersPDF.lastGeneratedParams;

// Computed selectors
export const selectIsPDFGenerating = (state) => state.ordersPDF.loading;
export const selectPDFGenerationError = (state) => state.ordersPDF.error;
