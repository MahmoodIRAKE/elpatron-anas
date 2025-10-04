import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllBranches, 
  fetchAllBranchesStatus, 
  fetchBranchAnalytics, 
  fetchTopCustomers,
  selectAllBranchesData,
  selectAllBranchesLoading,
  selectAllBranchesError
} from '../store';
import BranchSelector from './BranchSelector';
import YearMonthFilter from './YearMonthFilter';
// import AllBranchesReport from './reports/AllBranchesReport';
import BranchStatusReport from './reports/BranchStatusReport';
import BranchAnalyticsReport from './reports/BranchAnalyticsReport';
import TopCustomersReport from './reports/TopCustomersReport';
import OrdersDashboard from './OrdersDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const allBranches = useSelector(selectAllBranchesData);
  const allBranchesLoading = useSelector(selectAllBranchesLoading);
  const allBranchesError = useSelector(selectAllBranchesError);

  // Local state for filters
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'charts'
  const [currentView, setCurrentView] = useState('reports'); // 'reports' or 'orders'

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [dispatch]);

  // Fetch filtered data when filters change
  useEffect(() => {
    if (selectedBranch !== 'all') {
      dispatch(fetchBranchAnalytics({ 
        branchId: selectedBranch, 
        year: selectedYear 
      }));
      dispatch(fetchTopCustomers({ 
        branchId: selectedBranch, 
        year: selectedYear,
        limit: 10 
      }));
    } else {
      dispatch(fetchBranchAnalytics({ year: selectedYear }));
      dispatch(fetchTopCustomers({ year: selectedYear, limit: 10 }));
    }
    
    dispatch(fetchAllBranchesStatus());
  }, [dispatch, selectedBranch, selectedYear]);

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  if (allBranchesLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (allBranchesError) {
    return (
      <div className="dashboard-error">
        <h2>Error Loading Dashboard</h2>
        <p>{allBranchesError}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>ElpatronReports Dashboard</h1>
          <p>Comprehensive business analytics and reporting</p>
        </div>
        
        <div className="dashboard-navigation">
          <button
            className={`nav-btn ${currentView === 'reports' ? 'active' : ''}`}
            onClick={() => handleViewChange('reports')}
          >
            📊 Reports Dashboard
          </button>
          <button
            className={`nav-btn ${currentView === 'orders' ? 'active' : ''}`}
            onClick={() => handleViewChange('orders')}
          >
            📋 Orders Dashboard
          </button>
        </div>
        
        <div className="dashboard-controls">
          <BranchSelector 
            branches={allBranches?.branches || []}
            selectedBranch={selectedBranch}
            onBranchChange={handleBranchChange}
          />
          
          <YearMonthFilter
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
          />
          
          <div className="view-mode-toggle">
            <button 
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => handleViewModeChange('cards')}
            >
              📊 Cards
            </button>
            <button 
              className={viewMode === 'charts' ? 'active' : ''}
              onClick={() => handleViewModeChange('charts')}
            >
              📈 Charts
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {currentView === 'reports' ? (
          <div className="reports-grid">
            {/*<AllBranchesReport 
              viewMode={viewMode}
              selectedBranch={selectedBranch}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
            />*/}
            
            <BranchStatusReport 
              viewMode={viewMode}
              selectedBranch={selectedBranch}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
            />
            
            <BranchAnalyticsReport 
              viewMode={viewMode}
              selectedBranch={selectedBranch}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
            />
            
            <TopCustomersReport 
              viewMode={viewMode}
              selectedBranch={selectedBranch}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
            />
          </div>
        ) : (
          <OrdersDashboard />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
