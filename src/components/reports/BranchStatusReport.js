import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectAllBranchesStatusData, 
  selectAllBranchesStatusLoading, 
  selectAllBranchesStatusError 
} from '../../store';
import ReportCard from '../ReportCard';
import BranchStatusChart from '../charts/BranchStatusChart';
import './BranchStatusReport.css';

const BranchStatusReport = ({ viewMode, selectedBranch, selectedYear, selectedMonth }) => {
  const allBranchesStatus = useSelector(selectAllBranchesStatusData);
  const loading = useSelector(selectAllBranchesStatusLoading);
  const error = useSelector(selectAllBranchesStatusError);

  if (loading) {
    return <ReportCard title="Branch Status" loading={true} />;
  }

  if (error) {
    return <ReportCard title="Branch Status" error={error} />;
  }

  if (!allBranchesStatus) {
    return <ReportCard title="Branch Status" error="No data available" />;
  }

  const branches = allBranchesStatus.branches || [];
  const summary = allBranchesStatus.summary || {};
  const totalBranches = summary.totalBranches || 0;
  const openBranches = summary.openBranches || 0;
  const closedBranches = summary.closedBranches || 0;
  const currentTime = summary.currentTime || '';

  const stats = [
    {
      title: 'Total Branches',
      value: totalBranches,
      icon: '🏢',
      color: '#667eea'
    },
    {
      title: 'Currently Open',
      value: openBranches,
      icon: '🟢',
      color: '#10b981'
    },
    {
      title: 'Currently Closed',
      value: closedBranches,
      icon: '🔴',
      color: '#ef4444'
    },
    {
      title: 'Open Rate',
      value: totalBranches > 0 ? `${Math.round((openBranches / totalBranches) * 100)}%` : '0%',
      icon: '📊',
      color: '#8b5cf6'
    }
  ];

  const chartData = [
    { name: 'Open', value: openBranches, color: '#10b981' },
    { name: 'Closed', value: closedBranches, color: '#ef4444' }
  ];

  const deliveryBranches = branches.filter(branch => 
    branch.services?.delivery?.available && branch.services?.delivery?.enabled
  ).length;

  const pickupBranches = branches.filter(branch => 
    branch.services?.pickup?.available && branch.services?.pickup?.enabled
  ).length;

  return (
    <div className="branch-status-report">
      <ReportCard 
        title="Branch Status Overview" 
        subtitle={`Real-time status as of ${currentTime}`}
        stats={stats}
        viewMode={viewMode}
      >
        {viewMode === 'charts' ? (
          <div className="charts-container">
            <div className="chart-section">
              <h4>Branch Status Distribution</h4>
              <BranchStatusChart data={chartData} />
            </div>
            <div className="chart-section">
              <h4>Service Availability</h4>
              <BranchStatusChart data={[
                { name: 'Delivery Available', value: deliveryBranches, color: '#8b5cf6' },
                { name: 'Pickup Available', value: pickupBranches, color: '#f59e0b' }
              ]} />
            </div>
          </div>
        ) : (
          <div className="branches-status-list">
            <h4>Branch Status Details</h4>
            <div className="branches-grid">
              {branches.map((branch) => (
                <div key={branch.branchId} className="branch-status-item">
                  <div className="branch-header">
                    <h5>{branch.branchName}</h5>
                    <span className={`status-badge ${branch.status.toLowerCase()}`}>
                      {branch.status}
                    </span>
                  </div>
                  <div className="branch-details">
                    <p><strong>Arabic Name:</strong> {branch.branchNameAr}</p>
                    <p><strong>City:</strong> {branch.city}</p>
                    <p><strong>Branch #:</strong> {branch.branchNumber}</p>
                    <div className="business-hours">
                      <p><strong>Hours:</strong> {branch.businessHours?.openHours} - {branch.businessHours?.closeHours}</p>
                    </div>
                    <div className="services-status">
                      <div className="service-item">
                        <span className="service-label">Delivery:</span>
                        <span className={`service-status ${branch.services?.delivery?.enabled ? 'enabled' : 'disabled'}`}>
                          {branch.services?.delivery?.enabled ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div className="service-item">
                        <span className="service-label">Pickup:</span>
                        <span className={`service-status ${branch.services?.pickup?.enabled ? 'enabled' : 'disabled'}`}>
                          {branch.services?.pickup?.enabled ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
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

export default BranchStatusReport;
