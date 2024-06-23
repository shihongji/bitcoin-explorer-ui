import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function BlockchainMetricsChart() {
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/blockchain_metrics')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);  // Log the received data
        setMetrics(data);
      })
      .catch(e => {
        console.error("Fetch error:", e);
        setError(e.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (metrics.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <LineChart width={600} height={300} data={metrics}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line yAxisId="left" type="monotone" dataKey="block_height" stroke="#8884d8" />
      <Line yAxisId="right" type="monotone" dataKey="difficulty" stroke="#82ca9d" />
      <Line yAxisId="left" type="monotone" dataKey="connection_count" stroke="#ffc658" />
    </LineChart>
  );
}

export default BlockchainMetricsChart;
