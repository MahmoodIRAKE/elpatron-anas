import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersByBranch } from '../../services/ordersByBranchService';

// Async thunk
export const fetchOrdersByBranch = createAsyncThunk(
  'ordersByBranch/fetchOrdersByBranch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getOrdersByBranch(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders by branch');
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetchParams: null,
};

const ordersByBranchSlice = createSlice({
  name: 'ordersByBranch',
  initialState,
  reducers: {
    clearOrdersByBranch: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchParams = null;
    },
    clearOrdersByBranchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.lastFetchParams = action.meta.arg;
      })
      .addCase(fetchOrdersByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrdersByBranch, clearOrdersByBranchError } = ordersByBranchSlice.actions;
export default ordersByBranchSlice.reducer;
