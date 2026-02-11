import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import axios from 'axios';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('1987-01-01'); // Adjusted to see the 2005 break

    // 1. Fetch Data ONCE on mount
  useEffect(() => {
    const fetchData = async () => {
  try {
    const [priceRes, metricRes, eventRes] = await Promise.all([
      axios.get('http://localhost:5000/api/historical-prices'),
      axios.get('http://localhost:5000/api/change-point-results'),
      axios.get('http://localhost:5000/api/events')
    ]);

    // Use the whole dataset instead of .slice(4000, 7000)
    setPrices(priceRes.data); 

    const rawDate = new Date(metricRes.data.detected_date);
    const formattedTarget = rawDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: '2-digit'
    }).replace(/ /g, '-');

    setMetrics({ ...metricRes.data, detected_date: formattedTarget });
    setEvents(eventRes.data);
    setLoading(false);
  } catch (err) {
    console.error("Error:", err);
    setLoading(false);
  }
};
    fetchData();
  }, []); // Empty array means this only runs once

  // 2. Filter data locally based on the UI input
  const filteredPrices = useMemo(() => {
  if (prices.length === 0) return [];

  const filterDate = new Date(startDate);

  return prices.filter(p => {
    const parts = p.Date.split('-');
    if (parts.length !== 3) return false;

    const day = parts[0];
    const month = parts[1];
    let year = parseInt(parts[2]);

    // Logic to handle 2-digit years: 87-99 are 1900s, 00-22 are 2000s
    if (year > 50) {
      year = 1900 + year;
    } else {
      year = 2000 + year;
    }

    const itemDate = new Date(`${month} ${day}, ${year}`);
    return itemDate >= filterDate;
  });
}, [prices, startDate]);
  
  if (loading) return <div className="loading">Loading Birhan Energies Analysis...</div>;

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <h1>Birhan Energies: Brent Oil Price Analysis</h1>
        <p>Interactive Geopolitical Impact Dashboard</p>
      </header>

      {/* Metric Cards  */}
      <div className="metrics-grid">
        <div className="metric-card">
          <TrendingUp className="icon-blue" />
          <div>
            <h3>Average Price Shift</h3>
            <p className="highlight">+{metrics.impact_percentage}%</p>
          </div>
        </div>
        <div className="metric-card">
          <Calendar className="icon-red" />
          <div>
            <h3>Major Regime Change</h3>
            <p className="highlight">{metrics.detected_date}</p>
          </div>
        </div>
        <div className="metric-card">
          <AlertCircle className="icon-gold" />
          <div>
            <h3>Primary Catalyst</h3>
            <p className="highlight-small">{metrics.closest_event}</p>
          </div>
        </div>
      </div>
      <div className="filter-section">
        <label>View Data From: </label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>

      {/* Visualizer  */}
      <div className="chart-section">
        <h2>Historical Trend & Bayesian Change Points</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredPrices}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="Date" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Price" stroke="#1e3a8a" dot={false} strokeWidth={2} />
              {filteredPrices.some(p => p.Date === metrics.detected_date) && (
                <ReferenceLine 
                  x={metrics.detected_date} 
                  stroke="#dc2626" 
                  strokeWidth={3} 
                  label={{ value: 'Structural Break', fill: '#dc2626', position: 'top' }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events Table */}
      <div className="table-section">
        <h2>Geopolitical Event Log</h2>
        <div className="table-wrapper">
          <table className="event-table">
            <thead>
              <tr><th>Date</th><th>Event Description</th></tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={i}>
                  <td>{e.Date}</td>
                  <td>{e.Event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;