import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopCustomers } from '../../services/topCustomersService';

// Async thunk
export const fetchTopCustomers = createAsyncThunk(
  'topCustomers/fetchTopCustomers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getTopCustomers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch top customers');
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetchParams: null,
};

const topCustomersSlice = createSlice({
  name: 'topCustomers',
  initialState,
  reducers: {
    clearTopCustomers: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchParams = null;
    },
    clearTopCustomersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.lastFetchParams = action.meta.arg;
      })
      .addCase(fetchTopCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTopCustomers, clearTopCustomersError } = topCustomersSlice.actions;
export default topCustomersSlice.reducer;
