import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import './BranchMap.css';

const BranchMap = ({ branches }) => {
  if (!branches || branches.length === 0) {
    return (
      <div className="branch-map-empty">
        <MapPin size={48} />
        <p>No branch location data available</p>
      </div>
    );
  }

  return (
    <div className="branch-map">
      <div className="map-container">
        {branches.map((branch, index) => (
          <div key={branch.branchId} className="map-branch-item">
            <div className="branch-marker">
              <MapPin size={16} />
              <span className="marker-number">{index + 1}</span>
            </div>
            <div className="branch-info">
              <h5>{branch.branchName}</h5>
              <p className="branch-city">{branch.city}</p>
              <div className="branch-details">
                <div className="detail-item">
                  <Phone size={12} />
                  <span>{branch.branchPhone}</span>
                </div>
                <div className="detail-item">
                  <Clock size={12} />
                  <span>{branch.openHours} - {branch.closeHours}</span>
                </div>
              </div>
              <div className="branch-features">
                {branch.isKosher && <span className="feature">Kosher</span>}
                {branch.isDelivery && <span className="feature">Delivery</span>}
                {branch.isAppOn && <span className="feature">App</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchMap;
