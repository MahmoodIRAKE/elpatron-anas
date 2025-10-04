import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchOrdersByBranch,
  selectOrdersByBranchData,
  selectOrdersByBranchLoading,
  selectOrdersByBranchError,
  selectOrdersList,
  selectOrdersPagination,
  selectOrdersSummary,
  selectBranchInfo,
  selectBranchesList
} from '../store';
import BranchSelector from './BranchSelector';
import OrdersTimeFilter from './OrdersTimeFilter';
import OrderAccordion from './OrderAccordion';
import ReportCard from './ReportCard';
import './OrdersDashboard.css';

const OrdersDashboard = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const ordersData = useSelector(selectOrdersByBranchData);
  const loading = useSelector(selectOrdersByBranchLoading);
  const error = useSelector(selectOrdersByBranchError);
  const orders = useSelector(selectOrdersList);
  const pagination = useSelector(selectOrdersPagination);
  const summary = useSelector(selectOrdersSummary);
  const branchInfo = useSelector(selectBranchInfo);
  const branches = useSelector(selectBranchesList);
  
  // Summary selectors - using summary data directly instead of individual selectors
  
  // Local state
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(50);

  // Fetch branches on component mount
  useEffect(() => {
    if (branches.length === 0) {
      // Branches should already be loaded from main dashboard
      // If not, we could dispatch fetchAllBranches here
    }
  }, [branches]);

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterParams) => {
    const params = {
      ...filterParams,
      page: currentPage,
      limit: ordersPerPage
    };
    dispatch(fetchOrdersByBranch(params));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (selectedBranch !== 'all') {
      const params = {
        branchId: selectedBranch,
        page: page,
        limit: ordersPerPage
      };
      dispatch(fetchOrdersByBranch(params));
    }
  };

  const handleOrdersPerPageChange = (limit) => {
    setOrdersPerPage(limit);
    setCurrentPage(1);
    if (selectedBranch !== 'all') {
      const params = {
        branchId: selectedBranch,
        page: 1,
        limit: limit
      };
      dispatch(fetchOrdersByBranch(params));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
        >
          Previous
        </button>
        {pages}
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          Next
        </button>
      </div>
    );
  };

  // Calculate filtered totals from ALL orders (not just current page)
  const calculateFilteredTotals = () => {
    // Use summary data from API if available - this gives us totals for ALL filtered orders
    if (summary) {
      // Calculate credit and cash totals from the summary data
      const totalOrders = summary.totalOrders || 0;
      const totalRevenue = summary.totalRevenue || 0;
      const creditOrders = summary.creditOrders || 0;
      const cashOrders = summary.cashOrders || 0;
      
      // Calculate average order value for credit/cash split
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
      return {
        ordersCount: totalOrders,
        creditOrdersTotal: creditOrders * averageOrderValue,
        cashOrdersTotal: cashOrders * averageOrderValue,
        allOrdersTotal: totalRevenue
      };
    }

    // Fallback to current orders if no summary available (shouldn't happen in normal flow)
    const creditOrdersTotal = orders
      .filter(order => order.paymentMethod === 'credit')
      .reduce((sum, order) => sum + order.totalPrice, 0);
    
    const cashOrdersTotal = orders
      .filter(order => order.paymentMethod === 'cash')
      .reduce((sum, order) => sum + order.totalPrice, 0);
    
    const allOrdersTotal = orders
      .reduce((sum, order) => sum + order.totalPrice, 0);

    return {
      ordersCount: orders.length,
      creditOrdersTotal,
      cashOrdersTotal,
      allOrdersTotal
    };
  };

  const filteredTotals = calculateFilteredTotals();

  const renderSummaryCards = () => {
    const cards = [
      {
        title: 'Orders Count',
        value: filteredTotals.ordersCount.toLocaleString(),
        icon: '📊',
        color: '#007bff'
      },
      {
        title: 'Credit Orders Total',
        value: formatCurrency(filteredTotals.creditOrdersTotal),
        icon: '💳',
        color: '#6f42c1'
      },
      {
        title: 'Cash Orders Total',
        value: formatCurrency(filteredTotals.cashOrdersTotal),
        icon: '💵',
        color: '#20c997'
      },
      {
        title: 'All Orders Total',
        value: formatCurrency(filteredTotals.allOrdersTotal),
        icon: '💰',
        color: '#28a745'
      }
    ];

    return (
      <div className="summary-cards">
        {cards.map((card, index) => (
          <ReportCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
    );
  };

  if (loading && !ordersData) {
    return (
      <div className="orders-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
        <p>View and analyze orders by branch with advanced filtering</p>
      </div>

      <div className="dashboard-controls">
        <div className="control-group">
          <label>Select Branch:</label>
          <BranchSelector
            selectedBranch={selectedBranch}
            onBranchChange={handleBranchChange}
            branches={branches}
          />
        </div>

        <div className="control-group">
          <label>Orders per page:</label>
          <select
            value={ordersPerPage}
            onChange={(e) => handleOrdersPerPageChange(parseInt(e.target.value))}
            className="page-size-select"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>

      {selectedBranch !== 'all' && (
        <OrdersTimeFilter
          onFilterChange={handleFilterChange}
          selectedBranch={selectedBranch}
        />
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {branchInfo && (
        <div className="branch-info">
          <h3>
            {branchInfo.branchName} ({branchInfo.branchNameAr})
          </h3>
          <p>
            {branchInfo.city} • Branch #{branchInfo.branchNumber}
          </p>
        </div>
      )}

      <div className="summary-section">
        <h3>Summary</h3>
        {loading ? (
          <div className="summary-loading">
            <div className="loading-spinner"></div>
            <p>Calculating summary...</p>
          </div>
        ) : (
          renderSummaryCards()
        )}
      </div>

      <div className="orders-section">
        <div className="orders-header">
          <h3>
            Orders 
            {pagination && (
              <span className="orders-count">
                ({pagination.totalOrders.toLocaleString()} total)
              </span>
            )}
          </h3>
          {loading && <div className="loading-indicator">Loading...</div>}
        </div>

        {orders.length === 0 && !loading ? (
          <div className="no-orders">
            <p>No orders found for the selected criteria.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <OrderAccordion
                key={`${order.orderId}-${index}`}
                order={order}
                index={index}
              />
            ))}
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="pagination-section">
            <div className="pagination-info">
              Showing {((currentPage - 1) * ordersPerPage) + 1} to{' '}
              {Math.min(currentPage * ordersPerPage, pagination.totalOrders)} of{' '}
              {pagination.totalOrders} orders
            </div>
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
