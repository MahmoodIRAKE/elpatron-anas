// Top Customers Selectors
export const selectTopCustomers = (state) => state.topCustomers;
export const selectTopCustomersData = (state) => state.topCustomers.data;
export const selectTopCustomersLoading = (state) => state.topCustomers.loading;
export const selectTopCustomersError = (state) => state.topCustomers.error;
export const selectTopCustomersLastFetchParams = (state) => state.topCustomers.lastFetchParams;

// Computed selectors
export const selectTopCustomersOverallSummary = (state) => {
  const data = selectTopCustomersData(state);
  return data?.overallSummary || null;
};

export const selectTopCustomersBranchesList = (state) => {
  const data = selectTopCustomersData(state);
  return data?.branches || [];
};

export const selectTopCustomersByBranchId = (branchId) => (state) => {
  const branches = selectTopCustomersBranchesList(state);
  const branch = branches.find(b => b.branchInfo.branchId === branchId);
  return branch?.topCustomers || [];
};

export const selectTopCustomersBranchSummary = (branchId) => (state) => {
  const branches = selectTopCustomersBranchesList(state);
  const branch = branches.find(b => b.branchInfo.branchId === branchId);
  return branch?.summary || null;
};

export const selectTopCustomerById = (customerId, branchId) => (state) => {
  const topCustomers = selectTopCustomersByBranchId(branchId)(state);
  return topCustomers.find(customer => customer.customerId === customerId) || null;
};

export const selectTopCustomersTotalCustomers = (state) => {
  const summary = selectTopCustomersOverallSummary(state);
  return summary?.totalCustomers || 0;
};

export const selectTopCustomersTotalSpent = (state) => {
  const summary = selectTopCustomersOverallSummary(state);
  return summary?.totalSpent || 0;
};

export const selectTopCustomersAverageOrdersPerCustomer = (state) => {
  const summary = selectTopCustomersOverallSummary(state);
  return summary?.averageOrdersPerCustomer || 0;
};
