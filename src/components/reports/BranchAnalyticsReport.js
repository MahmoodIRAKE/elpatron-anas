import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectBranchAnalyticsData, 
  selectBranchAnalyticsLoading, 
  selectBranchAnalyticsError 
} from '../../store';
import ReportCard from '../ReportCard';
import RevenueChart from '../charts/RevenueChart';
import OrdersChart from '../charts/OrdersChart';
import MonthlyTrendChart from '../charts/MonthlyTrendChart';
import './BranchAnalyticsReport.css';

const BranchAnalyticsReport = ({ viewMode, selectedBranch, selectedYear, selectedMonth }) => {
  const branchAnalytics = useSelector(selectBranchAnalyticsData);
  const loading = useSelector(selectBranchAnalyticsLoading);
  const error = useSelector(selectBranchAnalyticsError);
  console.log(branchAnalytics);

  if (loading) {
    return <ReportCard title="Branch Analytics" loading={true} />;
  }

  if (error) {
    return <ReportCard title="Branch Analytics" error={error} />;
  }

  if (!branchAnalytics) {
    return <ReportCard title="Branch Analytics" error="No data available" />;
  }

  const overallSummary = branchAnalytics.overallSummary || {};
  const branchAnalyticsList = branchAnalytics.branchAnalytics || [];
  const year = branchAnalytics.year || selectedYear;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${overallSummary.totalRevenue?.toLocaleString() || 0}`,
      icon: '💰',
      color: '#10b981'
    },
    {
      title: 'Total Orders',
      value: overallSummary.totalOrders?.toLocaleString() || 0,
      icon: '📦',
      color: '#667eea'
    },
    {
      title: 'Credit Orders',
      value: overallSummary.totalCreditOrders?.toLocaleString() || 0,
      icon: '💳',
      color: '#8b5cf6'
    },
    {
      title: 'Cash Orders',
      value: overallSummary.totalCashOrders?.toLocaleString() || 0,
      icon: '💵',
      color: '#f59e0b'
    },
    {
      title: 'Delivery Orders',
      value: overallSummary.totalDeliveryOrders?.toLocaleString() || 0,
      icon: '🚚',
      color: '#ef4444'
    },
    {
      title: 'Pickup Orders',
      value: overallSummary.totalPickupOrders?.toLocaleString() || 0,
      icon: '🏪',
      color: '#06b6d4'
    }
  ];

  const revenueData = [
    { name: 'Credit Revenue', value: overallSummary.totalCreditRevenue || 0, color: '#8b5cf6' },
    { name: 'Cash Revenue', value: overallSummary.totalCashRevenue || 0, color: '#f59e0b' }
  ];

  const ordersData = [
    { name: 'Credit Orders', value: overallSummary.totalCreditOrders || 0, color: '#8b5cf6' },
    { name: 'Cash Orders', value: overallSummary.totalCashOrders || 0, color: '#f59e0b' }
  ];

  const deliveryData = [
    { name: 'Delivery Orders', value: overallSummary.totalDeliveryOrders || 0, color: '#ef4444' },
    { name: 'Pickup Orders', value: overallSummary.totalPickupOrders || 0, color: '#06b6d4' }
  ];

  // Prepare monthly trend data
  const monthlyTrendData = branchAnalyticsList.length > 0 
    ? branchAnalyticsList[0]?.monthlyBreakdown?.map(month => ({
        month: month.monthName,
        revenue: month.totalRevenue,
        orders: month.totalOrders,
        creditOrders: month.creditOrders,
        cashOrders: month.cashOrders
      })) || []
    : [];

  return (
    <div className="branch-analytics-report">
      <ReportCard 
        title="Branch Analytics" 
        subtitle={`Performance data for ${year}${selectedBranch !== 'all' ? ' - Selected Branch' : ' - All Branches'}`}
        stats={stats}
        viewMode={viewMode}
      >
        {viewMode === 'charts' ? (
          <div className="charts-container">
            <div className="chart-section">
              <h4>Revenue Breakdown</h4>
              <RevenueChart data={revenueData} />
            </div>
            <div className="chart-section">
              <h4>Orders by Payment Method</h4>
              <OrdersChart data={ordersData} />
            </div>
            <div className="chart-section">
              <h4>Orders by Type</h4>
              <OrdersChart data={deliveryData} />
            </div>
            <div className="chart-section full-width">
              <h4>Monthly Trends</h4>
              <MonthlyTrendChart data={monthlyTrendData} />
            </div>
          </div>
        ) : (
          <div className="analytics-details">
            <h4>Branch Performance Details</h4>
            <div className="branches-analytics-grid">
              {branchAnalyticsList.map((branch) => (
                <div key={branch.branchInfo.branchId} className="branch-analytics-item">
                  <div className="branch-header">
                    <h5>{branch.branchInfo.branchName}</h5>
                    <span className="branch-city">{branch.branchInfo.city}</span>
                  </div>
                  
                  <div className="branch-stats">
                    <div className="stat-row">
                      <span className="stat-label">Total Revenue:</span>
                      <span className="stat-value">${branch.yearlyTotals.totalRevenue?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Total Orders:</span>
                      <span className="stat-value">{branch.yearlyTotals.totalOrders?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Credit Orders:</span>
                      <span className="stat-value">{branch.yearlyTotals.creditOrders?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Cash Orders:</span>
                      <span className="stat-value">{branch.yearlyTotals.cashOrders?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Delivery Orders:</span>
                      <span className="stat-value">{branch.yearlyTotals.deliveryOrders?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Pickup Orders:</span>
                      <span className="stat-value">{branch.yearlyTotals.pickupOrders?.toLocaleString() || 0}</span>
                    </div>
                  </div>

                  {branch.paymentStatusSummary && (
                    <div className="payment-summary">
                      <h6>Payment Status Summary</h6>
                      <div className="payment-breakdown">
                        <div className="payment-method">
                          <h7>Credit</h7>
                          <div className="payment-stats">
                            <span>Paid: {branch.paymentStatusSummary.credit.paid.count} (${branch.paymentStatusSummary.credit.paid.totalAmount?.toLocaleString()})</span>
                            <span>Pending: {branch.paymentStatusSummary.credit.pending.count} (${branch.paymentStatusSummary.credit.pending.totalAmount?.toLocaleString()})</span>
                          </div>
                        </div>
                        <div className="payment-method">
                          <h7>Cash</h7>
                          <div className="payment-stats">
                            <span>Paid: {branch.paymentStatusSummary.cash.paid.count} (${branch.paymentStatusSummary.cash.paid.totalAmount?.toLocaleString()})</span>
                            <span>Pending: {branch.paymentStatusSummary.cash.pending.count} (${branch.paymentStatusSummary.cash.pending.totalAmount?.toLocaleString()})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </ReportCard>
    </div>
  );
};

export default BranchAnalyticsReport;
