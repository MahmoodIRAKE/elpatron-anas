// All Branches Selectors
export const selectAllBranches = (state) => state.allBranches;
export const selectAllBranchesData = (state) => state.allBranches.data;
export const selectAllBranchesLoading = (state) => state.allBranches.loading;
export const selectAllBranchesError = (state) => state.allBranches.error;

// Computed selectors
export const selectBranchesList = (state) => {
  const data = selectAllBranchesData(state);
  return data?.branches || [];
};

export const selectTotalBranches = (state) => {
  const data = selectAllBranchesData(state);
  return data?.totalBranches || 0;
};

export const selectBranchById = (branchId) => (state) => {
  const branches = selectBranchesList(state);
  return branches.find(branch => branch.branchId === branchId) || null;
};

export const selectOpenBranches = (state) => {
  const branches = selectBranchesList(state);
  return branches.filter(branch => branch.isOpen) || [];
};

export const selectClosedBranches = (state) => {
  const branches = selectBranchesList(state);
  return branches.filter(branch => !branch.isOpen) || [];
};

export const selectBranchesByCity = (city) => (state) => {
  const branches = selectBranchesList(state);
  return branches.filter(branch => branch.city === city) || [];
};

export const selectKosherBranches = (state) => {
  const branches = selectBranchesList(state);
  return branches.filter(branch => branch.isKosher) || [];
};

export const selectDeliveryBranches = (state) => {
  const branches = selectBranchesList(state);
  return branches.filter(branch => branch.isDelivery) || [];
};
