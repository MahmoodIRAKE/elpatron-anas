import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import './YearMonthFilter.css';

const YearMonthFilter = ({ selectedYear, selectedMonth, onYearChange, onMonthChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
  const months = [
    { value: null, label: 'All Year' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  return (
    <div className="year-month-filter">
      <div className="filter-group">
        <label className="filter-label">
          <Calendar size={18} />
          Year
        </label>
        <select 
          value={selectedYear} 
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="filter-select"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">
          <Clock size={18} />
          Month
        </label>
        <select 
          value={selectedMonth || ''} 
          onChange={(e) => onMonthChange(e.target.value ? parseInt(e.target.value) : null)}
          className="filter-select"
        >
          {months.map(month => (
            <option key={month.value || 'all'} value={month.value || ''}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearMonthFilter;
