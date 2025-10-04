import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './ChartStyles.css';

const MonthlyTrendChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No monthly trend data available</p>
      </div>
    );
  }

  return (
    <div className="monthly-trend-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            name="Revenue ($)"
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            stroke="#667eea" 
            strokeWidth={3}
            dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
            name="Total Orders"
          />
          <Line 
            type="monotone" 
            dataKey="creditOrders" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
            name="Credit Orders"
          />
          <Line 
            type="monotone" 
            dataKey="cashOrders" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
            name="Cash Orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
