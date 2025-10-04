import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import './BranchSelector.css';

const BranchSelector = ({ branches, selectedBranch, onBranchChange }) => {
  return (
    <div className="branch-selector">
      <label className="filter-label">
        <Building2 size={18} />
        Select Branch
      </label>
      <select 
        value={selectedBranch} 
        onChange={(e) => onBranchChange(e.target.value)}
        className="branch-select"
      >
        <option value="all">All Branches</option>
        {branches.map((branch) => (
          <option key={branch.branchId} value={branch.branchId}>
            {branch.branchName} - {branch.city}
          </option>
        ))}
      </select>
      
      {selectedBranch !== 'all' && (
        <div className="selected-branch-info">
          {(() => {
            const branch = branches.find(b => b.branchId === selectedBranch);
            return branch ? (
              <div className="branch-details">
                <MapPin size={14} />
                <span>{branch.branchNameAr}</span>
                <span className="branch-manager">Manager: {branch.branchManager}</span>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default BranchSelector;
