// Branch Status Models
export const BranchStatus = {
  branchId: '',
  branchName: '',
  branchNameAr: '',
  city: '',
  branchManager: '',
  branchPhone: '',
  branchNumber: '',
  isActive: false,
  isKosher: false,
  isAppOn: false,
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  businessHours: {
    openHours: '',
    closeHours: '',
    isCurrentlyOpen: false,
    currentTime: '',
  },
  services: {
    delivery: {
      available: false,
      enabled: false,
    },
    pickup: {
      available: false,
      enabled: false,
    },
  },
  status: {
    overall: 'CLOSED',
    reason: '',
  },
};

export const AllBranchesStatus = {
  branches: [],
  summary: {
    totalBranches: 0,
    openBranches: 0,
    closedBranches: 0,
    currentTime: '',
  },
};

// Branch Analytics Models
export const BranchAnalytics = {
  year: new Date().getFullYear(),
  overallSummary: {
    totalBranches: 0,
    totalOrders: 0,
    totalCreditOrders: 0,
    totalCashOrders: 0,
    totalDeliveryOrders: 0,
    totalPickupOrders: 0,
    totalRevenue: 0,
    totalCreditRevenue: 0,
    totalCashRevenue: 0,
    totalDeliveryRevenue: 0,
    totalPickupRevenue: 0,
  },
  branchAnalytics: [],
  generatedAt: '',
};

export const MonthlyBreakdown = {
  month: 0,
  monthName: '',
  totalOrders: 0,
  creditOrders: 0,
  cashOrders: 0,
  deliveryOrders: 0,
  pickupOrders: 0,
  totalRevenue: 0,
  creditRevenue: 0,
  cashRevenue: 0,
  deliveryRevenue: 0,
  pickupRevenue: 0,
};

export const YearlyTotals = {
  totalOrders: 0,
  creditOrders: 0,
  cashOrders: 0,
  deliveryOrders: 0,
  pickupOrders: 0,
  totalRevenue: 0,
  creditRevenue: 0,
  cashRevenue: 0,
  deliveryRevenue: 0,
  pickupRevenue: 0,
};

export const PaymentStatusSummary = {
  credit: {
    pending: { count: 0, totalAmount: 0 },
    paid: { count: 0, totalAmount: 0 },
    total: { count: 0, totalAmount: 0 },
  },
  cash: {
    pending: { count: 0, totalAmount: 0 },
    paid: { count: 0, totalAmount: 0 },
    total: { count: 0, totalAmount: 0 },
  },
};

// Top Customers Models
export const TopCustomers = {
  year: new Date().getFullYear(),
  overallSummary: {
    totalBranches: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalSpent: 0,
    averageOrdersPerCustomer: 0,
  },
  branches: [],
  generatedAt: '',
};

export const CustomerInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  ecoins: 0,
  createdDate: '',
};

export const TopCustomer = {
  customerId: '',
  customerInfo: CustomerInfo,
  totalOrders: 0,
  totalSpent: 0,
  paidOrders: 0,
  paidAmount: 0,
  creditOrders: 0,
  cashOrders: 0,
  deliveryOrders: 0,
  pickupOrders: 0,
  lastOrderDate: '',
  firstOrderDate: '',
  averageOrderValue: 0,
};

// Request Models
export const BranchAnalyticsRequest = {
  branchId: '',
  year: new Date().getFullYear(),
};

export const TopCustomersRequest = {
  branchId: '',
  year: new Date().getFullYear(),
  limit: 10,
};

export const OrdersPDFRequest = {
  branchId: '',
  year: new Date().getFullYear(),
  month: null,
};

// API Response Models
export const ApiResponse = {
  success: false,
  message: '',
  data: null,
};

export const ErrorResponse = {
  success: false,
  message: '',
  error: '',
};
