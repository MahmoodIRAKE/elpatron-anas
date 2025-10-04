import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBranchStatus, getAllBranchesStatus } from '../../services/branchStatusService';

// Async thunks
export const fetchBranchStatus = createAsyncThunk(
  'branchStatus/fetchBranchStatus',
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await getBranchStatus(branchId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch branch status');
    }
  }
);

export const fetchAllBranchesStatus = createAsyncThunk(
  'branchStatus/fetchAllBranchesStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBranchesStatus();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch all branches status');
    }
  }
);

const initialState = {
  // Single branch status
  branchStatus: {
    data: null,
    loading: false,
    error: null,
  },
  // All branches status
  allBranchesStatus: {
    data: null,
    loading: false,
    error: null,
  },
};

const branchStatusSlice = createSlice({
  name: 'branchStatus',
  initialState,
  reducers: {
    clearBranchStatus: (state) => {
      state.branchStatus = {
        data: null,
        loading: false,
        error: null,
      };
    },
    clearAllBranchesStatus: (state) => {
      state.allBranchesStatus = {
        data: null,
        loading: false,
        error: null,
      };
    },
    clearErrors: (state) => {
      state.branchStatus.error = null;
      state.allBranchesStatus.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch single branch status
    builder
      .addCase(fetchBranchStatus.pending, (state) => {
        state.branchStatus.loading = true;
        state.branchStatus.error = null;
      })
      .addCase(fetchBranchStatus.fulfilled, (state, action) => {
        state.branchStatus.loading = false;
        state.branchStatus.data = action.payload.data;
        state.branchStatus.error = null;
      })
      .addCase(fetchBranchStatus.rejected, (state, action) => {
        state.branchStatus.loading = false;
        state.branchStatus.error = action.payload;
      });

    // Fetch all branches status
    builder
      .addCase(fetchAllBranchesStatus.pending, (state) => {
        state.allBranchesStatus.loading = true;
        state.allBranchesStatus.error = null;
      })
      .addCase(fetchAllBranchesStatus.fulfilled, (state, action) => {
        state.allBranchesStatus.loading = false;
        state.allBranchesStatus.data = action.payload.data;
        state.allBranchesStatus.error = null;
      })
      .addCase(fetchAllBranchesStatus.rejected, (state, action) => {
        state.allBranchesStatus.loading = false;
        state.allBranchesStatus.error = action.payload;
      });
  },
});

export const { clearBranchStatus, clearAllBranchesStatus, clearErrors } = branchStatusSlice.actions;
export default branchStatusSlice.reducer;
