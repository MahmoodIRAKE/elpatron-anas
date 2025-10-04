// Orders By Branch Selectors
export const selectOrdersByBranch = (state) => state.ordersByBranch;
export const selectOrdersByBranchData = (state) => state.ordersByBranch.data;
export const selectOrdersByBranchLoading = (state) => state.ordersByBranch.loading;
export const selectOrdersByBranchError = (state) => state.ordersByBranch.error;
export const selectOrdersByBranchLastFetchParams = (state) => state.ordersByBranch.lastFetchParams;

// Computed selectors
export const selectOrdersList = (state) => {
  const data = selectOrdersByBranchData(state);
  return data?.orders || [];
};

export const selectOrdersPagination = (state) => {
  const data = selectOrdersByBranchData(state);
  return data?.pagination || null;
};

export const selectOrdersSummary = (state) => {
  const data = selectOrdersByBranchData(state);
  return data?.summary || null;
};

export const selectBranchInfo = (state) => {
  const data = selectOrdersByBranchData(state);
  return data?.branchInfo || null;
};

export const selectTimeFilter = (state) => {
  const data = selectOrdersByBranchData(state);
  return data?.timeFilter || null;
};

export const selectTotalOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.totalOrders || 0;
};

export const selectTotalRevenue = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.totalRevenue || 0;
};

export const selectPaidOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.paidOrders || 0;
};

export const selectPendingOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.pendingOrders || 0;
};

export const selectCreditOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.creditOrders || 0;
};

export const selectCashOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.cashOrders || 0;
};

export const selectDeliveryOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.deliveryOrders || 0;
};

export const selectPickupOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.pickupOrders || 0;
};

export const selectUrgentOrders = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.urgentOrders || 0;
};

export const selectAverageOrderValue = (state) => {
  const summary = selectOrdersSummary(state);
  return summary?.averageOrderValue || 0;
};

// Filtered selectors
export const selectOrdersByStatus = (status) => (state) => {
  const orders = selectOrdersList(state);
  return orders.filter(order => order.orderStatus === status);
};

export const selectOrdersByPaymentMethod = (method) => (state) => {
  const orders = selectOrdersList(state);
  return orders.filter(order => order.paymentMethod === method);
};

export const selectOrdersByType = (type) => (state) => {
  const orders = selectOrdersList(state);
  return orders.filter(order => order.orderType === type);
};

export const selectUrgentOrdersList = (state) => {
  const orders = selectOrdersList(state);
  return orders.filter(order => order.isUrgent);
};

export const selectOrdersByCustomer = (customerId) => (state) => {
  const orders = selectOrdersList(state);
  return orders.filter(order => order.customerInfo.customerId === customerId);
};
