import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import './ReportCard.css';

const ReportCard = ({ 
  title, 
  subtitle, 
  stats = [], 
  children, 
  loading = false, 
  error = null,
  viewMode = 'cards'
}) => {
  if (loading) {
    return (
      <div className="report-card loading">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-content">
          <div className="loading-state">
            <Loader2 className="loading-spinner" size={24} />
            <p>Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-card error">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-content">
          <div className="error-state">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-card">
      <div className="card-header">
        <div className="header-content">
          <h3>{title}</h3>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
        <div className="view-mode-indicator">
          {viewMode === 'charts' ? '📈 Charts' : '📊 Cards'}
        </div>
      </div>
      
      {stats.length > 0 && (
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-value" style={{ color: stat.color }}>
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </div>
                <div className="stat-title">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default ReportCard;
