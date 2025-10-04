import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectTopCustomersData, 
  selectTopCustomersLoading, 
  selectTopCustomersError 
} from '../../store';
import ReportCard from '../ReportCard';
import CustomerRankingChart from '../charts/CustomerRankingChart';
import './TopCustomersReport.css';

const TopCustomersReport = ({ viewMode, selectedBranch, selectedYear, selectedMonth }) => {
  const topCustomers = useSelector(selectTopCustomersData);
  const loading = useSelector(selectTopCustomersLoading);
  const error = useSelector(selectTopCustomersError);

  if (loading) {
    return <ReportCard title="Top Customers" loading={true} />;
  }

  if (error) {
    return <ReportCard title="Top Customers" error={error} />;
  }

  if (!topCustomers) {
    return <ReportCard title="Top Customers" error="No data available" />;
  }

  const overallSummary = topCustomers.overallSummary || {};
  const branches = topCustomers.branches || [];
  const year = topCustomers.year || selectedYear;

  const stats = [
    {
      title: 'Total Customers',
      value: overallSummary.totalCustomers?.toLocaleString() || 0,
      icon: '👥',
      color: '#667eea'
    },
    {
      title: 'Total Orders',
      value: overallSummary.totalOrders?.toLocaleString() || 0,
      icon: '📦',
      color: '#10b981'
    },
    {
      title: 'Total Spent',
      value: `$${overallSummary.totalSpent?.toLocaleString() || 0}`,
      icon: '💰',
      color: '#f59e0b'
    },
    {
      title: 'Avg Orders/Customer',
      value: overallSummary.averageOrdersPerCustomer?.toFixed(1) || 0,
      icon: '📊',
      color: '#8b5cf6'
    }
  ];

  // Prepare chart data for customer rankings
  const chartData = branches.length > 0 && branches[0].topCustomers 
    ? branches[0].topCustomers.slice(0, 10).map((customer, index) => ({
        name: `${customer.customerInfo.firstName} ${customer.customerInfo.lastName}`,
        orders: customer.totalOrders,
        spent: customer.totalSpent,
        rank: index + 1
      }))
    : [];

  return (
    <div className="top-customers-report">
      <ReportCard 
        title="Top Customers Analysis" 
        subtitle={`Customer insights for ${year}${selectedBranch !== 'all' ? ' - Selected Branch' : ' - All Branches'}`}
        stats={stats}
        viewMode={viewMode}
      >
        {viewMode === 'charts' ? (
          <div className="charts-container">
            <div className="chart-section full-width">
              <h4>Top 10 Customers by Orders</h4>
              <CustomerRankingChart data={chartData} />
            </div>
          </div>
        ) : (
          <div className="customers-details">
            <h4>Customer Performance Details</h4>
            <div className="branches-customers-grid">
              {branches.map((branch) => (
                <div key={branch.branchInfo.branchId} className="branch-customers-item">
                  <div className="branch-header">
                    <h5>{branch.branchInfo.branchName}</h5>
                    <span className="branch-city">{branch.branchInfo.city}</span>
                  </div>
                  
                  <div className="branch-summary">
                    <div className="summary-stats">
                      <div className="summary-item">
                        <span className="summary-label">Total Customers:</span>
                        <span className="summary-value">{branch.summary.totalCustomers}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Total Orders:</span>
                        <span className="summary-value">{branch.summary.totalOrders}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Total Spent:</span>
                        <span className="summary-value">${branch.summary.totalSpent?.toLocaleString()}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Avg Orders/Customer:</span>
                        <span className="summary-value">{branch.summary.averageOrdersPerCustomer?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="top-customers-list">
                    <h6>Top Customers</h6>
                    <div className="customers-grid">
                      {branch.topCustomers.slice(0, 5).map((customer, index) => (
                        <div key={customer.customerId} className="customer-item">
                          <div className="customer-rank">
                            <span className="rank-number">#{index + 1}</span>
                          </div>
                          <div className="customer-info">
                            <h7>{customer.customerInfo.firstName} {customer.customerInfo.lastName}</h7>
                            <p className="customer-phone">{customer.customerInfo.phone}</p>
                            <div className="customer-stats">
                              <div className="customer-stat">
                                <span className="stat-label">Orders:</span>
                                <span className="stat-value">{customer.totalOrders}</span>
                              </div>
                              <div className="customer-stat">
                                <span className="stat-label">Spent:</span>
                                <span className="stat-value">${customer.totalSpent?.toLocaleString()}</span>
                              </div>
                              <div className="customer-stat">
                                <span className="stat-label">Avg Order:</span>
                                <span className="stat-value">${customer.averageOrderValue?.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="customer-details">
                              <div className="detail-row">
                                <span>Credit: {customer.creditOrders}</span>
                                <span>Cash: {customer.cashOrders}</span>
                              </div>
                              <div className="detail-row">
                                <span>Delivery: {customer.deliveryOrders}</span>
                                <span>Pickup: {customer.pickupOrders}</span>
                              </div>
                              <div className="detail-row">
                                <span>E-coins: {customer.customerInfo.ecoins}</span>
                                <span>Last Order: {new Date(customer.lastOrderDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ReportCard>
    </div>
  );
};

export default TopCustomersReport;
