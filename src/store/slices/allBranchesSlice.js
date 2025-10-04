import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBranches } from '../../services/allBranchesService';

// Async thunk
export const fetchAllBranches = createAsyncThunk(
  'allBranches/fetchAllBranches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBranches();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch all branches');
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const allBranchesSlice = createSlice({
  name: 'allBranches',
  initialState,
  reducers: {
    clearAllBranches: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    clearAllBranchesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllBranches, clearAllBranchesError } = allBranchesSlice.actions;
export default allBranchesSlice.reducer;
