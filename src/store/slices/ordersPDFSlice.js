import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateOrdersPDF } from '../../services/ordersPDFService';

// Async thunk
export const generatePDF = createAsyncThunk(
  'ordersPDF/generatePDF',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await generateOrdersPDF(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to generate PDF');
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  lastGeneratedParams: null,
};

const ordersPDFSlice = createSlice({
  name: 'ordersPDF',
  initialState,
  reducers: {
    clearPDFError: (state) => {
      state.error = null;
    },
    resetPDFState: (state) => {
      state.loading = false;
      state.error = null;
      state.lastGeneratedParams = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePDF.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastGeneratedParams = action.meta.arg;
      })
      .addCase(generatePDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPDFError, resetPDFState } = ordersPDFSlice.actions;
export default ordersPDFSlice.reducer;
