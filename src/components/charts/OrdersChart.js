import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartStyles.css';

const OrdersChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value" style={{ color: data.color }}>
            {data.value.toLocaleString()} orders
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="chart-legend">
        {payload.map((entry, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="legend-label">{entry.value}</span>
            <span className="legend-value">{entry.payload.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="orders-chart">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
