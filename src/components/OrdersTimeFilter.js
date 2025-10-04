import React, { useState, useEffect } from 'react';
import './OrdersTimeFilter.css';

const OrdersTimeFilter = ({ 
  onFilterChange, 
  selectedBranch, 
  initialFilter = 'all' 
}) => {
  const [timeFilter, setTimeFilter] = useState(initialFilter);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Generate years (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Generate months
  const months = [
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

  // Generate weeks (1-53)
  const weeks = Array.from({ length: 53 }, (_, i) => i + 1);

  // Generate days (1-31) - removed unused variable

  // Get days in selected month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const availableDays = getDaysInMonth(year, month);

  useEffect(() => {
    if (selectedBranch && selectedBranch !== 'all') {
      const params = buildFilterParams();
      onFilterChange(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter, year, month, week, day, startDate, endDate, selectedBranch]);

  const buildFilterParams = () => {
    const params = {
      branchId: selectedBranch,
      timeFilter: timeFilter,
      page: 1,
      limit: 50
    };

    switch (timeFilter) {
      case 'year':
        params.year = year;
        break;
      case 'month':
        params.year = year;
        params.month = month;
        break;
      case 'week':
        params.year = year;
        params.week = week;
        break;
      case 'day':
        params.year = year;
        params.month = month;
        params.day = day;
        break;
      case 'dateRange':
        params.startDate = startDate;
        params.endDate = endDate;
        break;
      default:
        // 'all' - no additional params needed
        break;
    }

    return params;
  };

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    // Reset day if it's greater than days in new month
    const daysInNewMonth = getDaysInMonth(year, newMonth);
    if (day > daysInNewMonth) {
      setDay(1);
    }
  };

  const handleWeekChange = (newWeek) => {
    setWeek(newWeek);
  };

  const handleDayChange = (newDay) => {
    setDay(newDay);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const resetFilters = () => {
    setTimeFilter('all');
    setYear(currentYear);
    setMonth(new Date().getMonth() + 1);
    setWeek(1);
    setDay(1);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="orders-time-filter">
      <div className="filter-header">
        <h3>Time Filter</h3>
        <button 
          className="reset-btn"
          onClick={resetFilters}
          title="Reset all filters"
        >
          Reset
        </button>
      </div>

      <div className="filter-options">
        <div className="filter-type">
          <label>Filter Type:</label>
          <div className="filter-buttons">
            {[
              { value: 'all', label: 'All Time' },
              { value: 'year', label: 'By Year' },
              { value: 'month', label: 'By Month' },
              { value: 'week', label: 'By Week' },
              { value: 'day', label: 'By Day' },
              { value: 'dateRange', label: 'Date Range' }
            ].map(option => (
              <button
                key={option.value}
                className={`filter-btn ${timeFilter === option.value ? 'active' : ''}`}
                onClick={() => handleTimeFilterChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {timeFilter === 'year' && (
          <div className="filter-details">
            <label>Year:</label>
            <select 
              value={year} 
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {timeFilter === 'month' && (
          <div className="filter-details">
            <label>Year:</label>
            <select 
              value={year} 
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <label>Month:</label>
            <select 
              value={month} 
              onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        )}

        {timeFilter === 'week' && (
          <div className="filter-details">
            <label>Year:</label>
            <select 
              value={year} 
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <label>Week:</label>
            <select 
              value={week} 
              onChange={(e) => handleWeekChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {weeks.map(w => (
                <option key={w} value={w}>Week {w}</option>
              ))}
            </select>
          </div>
        )}

        {timeFilter === 'day' && (
          <div className="filter-details">
            <label>Year:</label>
            <select 
              value={year} 
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <label>Month:</label>
            <select 
              value={month} 
              onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <label>Day:</label>
            <select 
              value={day} 
              onChange={(e) => handleDayChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {Array.from({ length: availableDays }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}

        {timeFilter === 'dateRange' && (
          <div className="filter-details">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="filter-input"
            />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="filter-input"
              min={startDate}
            />
          </div>
        )}
      </div>

      {timeFilter !== 'all' && (
        <div className="filter-summary">
          <p>
            <strong>Current Filter:</strong> {
              (timeFilter === 'year' && `Year ${year}`) ||
              (timeFilter === 'month' && `${months[month - 1].label} ${year}`) ||
              (timeFilter === 'week' && `Week ${week} of ${year}`) ||
              (timeFilter === 'day' && `${months[month - 1].label} ${day}, ${year}`) ||
              (timeFilter === 'dateRange' && `${startDate} to ${endDate}`) ||
              'All Time'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersTimeFilter;
