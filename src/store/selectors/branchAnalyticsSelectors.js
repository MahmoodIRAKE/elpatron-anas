// Branch Analytics Selectors
export const selectBranchAnalytics = (state) => state.branchAnalytics;
export const selectBranchAnalyticsData = (state) => state.branchAnalytics.data;
export const selectBranchAnalyticsLoading = (state) => state.branchAnalytics.loading;
export const selectBranchAnalyticsError = (state) => state.branchAnalytics.error;
export const selectBranchAnalyticsLastFetchParams = (state) => state.branchAnalytics.lastFetchParams;

// Computed selectors
export const selectBranchAnalyticsOverallSummary = (state) => {
  const data = selectBranchAnalyticsData(state);
  return data?.overallSummary || null;
};

export const selectBranchAnalyticsList = (state) => {
  const data = selectBranchAnalyticsData(state);
  return data?.branchAnalytics || [];
};

export const selectBranchAnalyticsById = (branchId) => (state) => {
  const analytics = selectBranchAnalyticsList(state);
  return analytics.find(branch => branch.branchInfo.branchId === branchId) || null;
};

export const selectYearlyTotals = (branchId) => (state) => {
  const branchAnalytics = selectBranchAnalyticsById(branchId)(state);
  return branchAnalytics?.yearlyTotals || null;
};

export const selectMonthlyBreakdown = (branchId) => (state) => {
  const branchAnalytics = selectBranchAnalyticsById(branchId)(state);
  return branchAnalytics?.monthlyBreakdown || [];
};

export const selectPaymentStatusSummary = (branchId) => (state) => {
  const branchAnalytics = selectBranchAnalyticsById(branchId)(state);
  return branchAnalytics?.paymentStatusSummary || null;
};

export const selectBranchAnalyticsTotalRevenue = (state) => {
  const summary = selectBranchAnalyticsOverallSummary(state);
  return summary?.totalRevenue || 0;
};

export const selectBranchAnalyticsTotalOrders = (state) => {
  const summary = selectBranchAnalyticsOverallSummary(state);
  return summary?.totalOrders || 0;
};
