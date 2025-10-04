import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBranchAnalytics } from '../../services/branchAnalyticsService';

// Async thunk
export const fetchBranchAnalytics = createAsyncThunk(
  'branchAnalytics/fetchBranchAnalytics',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getBranchAnalytics(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch branch analytics');
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetchParams: null,
};

const branchAnalyticsSlice = createSlice({
  name: 'branchAnalytics',
  initialState,
  reducers: {
    clearBranchAnalytics: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchParams = null;
    },
    clearBranchAnalyticsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
        state.lastFetchParams = action.meta.arg;
      })
      .addCase(fetchBranchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBranchAnalytics, clearBranchAnalyticsError } = branchAnalyticsSlice.actions;
export default branchAnalyticsSlice.reducer;
