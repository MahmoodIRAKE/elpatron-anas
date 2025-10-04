import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectAllBranchesData, 
  selectAllBranchesLoading, 
  selectAllBranchesError 
} from '../../store';
import ReportCard from '../ReportCard';
import BranchMap from '../charts/BranchMap';
import BranchStatusChart from '../charts/BranchStatusChart';
import './AllBranchesReport.css';

const AllBranchesReport = ({ viewMode, selectedBranch, selectedYear, selectedMonth }) => {
  const allBranches = useSelector(selectAllBranchesData);
  const loading = useSelector(selectAllBranchesLoading);
  const error = useSelector(selectAllBranchesError);

  if (loading) {
    return <ReportCard title="All Branches" loading={true} />;
  }

  if (error) {
    return <ReportCard title="All Branches" error={error} />;
  }

  if (!allBranches) {
    return <ReportCard title="All Branches" error="No data available" />;
  }

  const branches = allBranches.branches || [];
  const totalBranches = allBranches.totalBranches || 0;
  const openBranches = branches.filter(branch => branch.isOpen).length;
  const closedBranches = totalBranches - openBranches;
  const kosherBranches = branches.filter(branch => branch.isKosher).length;
  const deliveryBranches = branches.filter(branch => branch.isDelivery).length;

  const stats = [
    {
      title: 'Total Branches',
      value: totalBranches,
      icon: '🏢',
      color: '#667eea'
    },
    {
      title: 'Open Branches',
      value: openBranches,
      icon: '🟢',
      color: '#10b981'
    },
    {
      title: 'Closed Branches',
      value: closedBranches,
      icon: '🔴',
      color: '#ef4444'
    },
    {
      title: 'Kosher Branches',
      value: kosherBranches,
      icon: '✡️',
      color: '#f59e0b'
    },
    {
      title: 'Delivery Available',
      value: deliveryBranches,
      icon: '🚚',
      color: '#8b5cf6'
    }
  ];

  const chartData = {
    status: [
      { name: 'Open', value: openBranches, color: '#10b981' },
      { name: 'Closed', value: closedBranches, color: '#ef4444' }
    ],
    services: [
      { name: 'Kosher', value: kosherBranches, color: '#f59e0b' },
      { name: 'Non-Kosher', value: totalBranches - kosherBranches, color: '#6b7280' }
    ],
    delivery: [
      { name: 'Delivery Available', value: deliveryBranches, color: '#8b5cf6' },
      { name: 'No Delivery', value: totalBranches - deliveryBranches, color: '#6b7280' }
    ]
  };

  return (
    <div className="all-branches-report">
      <ReportCard 
        title="All Branches Overview" 
        subtitle={`${totalBranches} branches across all locations`}
        stats={stats}
        viewMode={viewMode}
      >
        {viewMode === 'charts' ? (
          <div className="charts-container">
            <div className="chart-section">
              <h4>Branch Status Distribution</h4>
              <BranchStatusChart data={chartData.status} />
            </div>
            <div className="chart-section">
              <h4>Service Types</h4>
              <BranchStatusChart data={chartData.services} />
            </div>
            <div className="chart-section">
              <h4>Delivery Availability</h4>
              <BranchStatusChart data={chartData.delivery} />
            </div>
            <div className="chart-section">
              <h4>Branch Locations</h4>
              <BranchMap branches={branches} />
            </div>
          </div>
        ) : (
          <div className="branches-list">
            <h4>Branch Details</h4>
            <div className="branches-grid">
              {branches.map((branch) => (
                <div key={branch.branchId} className="branch-item">
                  <div className="branch-header">
                    <h5>{branch.branchName}</h5>
                    <span className={`status-badge ${branch.isOpen ? 'open' : 'closed'}`}>
                      {branch.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div className="branch-details">
                    <p><strong>Arabic Name:</strong> {branch.branchNameAr}</p>
                    <p><strong>City:</strong> {branch.city}</p>
                    <p><strong>Manager:</strong> {branch.branchManager}</p>
                    <p><strong>Phone:</strong> {branch.branchPhone}</p>
                    <p><strong>Branch #:</strong> {branch.branchNumber}</p>
                    <div className="branch-features">
                      {branch.isKosher && <span className="feature-tag kosher">Kosher</span>}
                      {branch.isDelivery && <span className="feature-tag delivery">Delivery</span>}
                      {branch.isAppOn && <span className="feature-tag app">App Enabled</span>}
                    </div>
                    <div className="branch-hours">
                      <p><strong>Hours:</strong> {branch.openHours} - {branch.closeHours}</p>
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

export default AllBranchesReport;
