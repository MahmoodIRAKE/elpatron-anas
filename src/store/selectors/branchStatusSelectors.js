// Branch Status Selectors
export const selectBranchStatus = (state) => state.branchStatus.branchStatus;
export const selectBranchStatusData = (state) => state.branchStatus.branchStatus.data;
export const selectBranchStatusLoading = (state) => state.branchStatus.branchStatus.loading;
export const selectBranchStatusError = (state) => state.branchStatus.branchStatus.error;

// All Branches Status Selectors
export const selectAllBranchesStatus = (state) => state.branchStatus.allBranchesStatus;
export const selectAllBranchesStatusData = (state) => state.branchStatus.allBranchesStatus.data;
export const selectAllBranchesStatusLoading = (state) => state.branchStatus.allBranchesStatus.loading;
export const selectAllBranchesStatusError = (state) => state.branchStatus.allBranchesStatus.error;

// Computed selectors
export const selectBranchesSummary = (state) => {
  const data = selectAllBranchesStatusData(state);
  return data?.summary || null;
};

export const selectStatusOpenBranches = (state) => {
  const data = selectAllBranchesStatusData(state);
  return data?.branches?.filter(branch => branch.status === 'OPEN') || [];
};

export const selectStatusClosedBranches = (state) => {
  const data = selectAllBranchesStatusData(state);
  return data?.branches?.filter(branch => branch.status === 'CLOSED') || [];
};

export const selectStatusBranchById = (branchId) => (state) => {
  const data = selectAllBranchesStatusData(state);
  return data?.branches?.find(branch => branch.branchId === branchId) || null;
};
