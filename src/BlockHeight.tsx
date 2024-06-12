import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import RefreshButton from './components/RefreshButton';

interface Metric {
  timestamp: string;
  block_height: number;
  difficulty: number;
  connection_count: number;
}
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function BlockchainMetricsChart() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    fetch(`${API_URL}/blockchain_metrics`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Metric[]) => {
        console.log("Received data:", data);
        setMetrics(data);
      })
      .catch(e => {
        console.error("Fetch error:", e);
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 60000); // Refresh every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (metrics.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LineChart width={900} height={600} data={metrics}>
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
      <RefreshButton onRefresh={fetchData} />
    </div>
  );
}



export default BlockchainMetricsChart;
