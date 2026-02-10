import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import axios from 'axios';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching analysis results from Flask Backend 
    const fetchData = async () => {
  try {
    const priceRes = await axios.get('http://localhost:5000/api/historical-prices');
    const metricRes = await axios.get('http://localhost:5000/api/change-point-results');
    const eventRes = await axios.get('http://localhost:5000/api/events');
    
    const rawDate = new Date(metricRes.data.detected_date);
  
    // This creates a string like "24-Feb-05"
    const formattedTarget = rawDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    }).replace(/ /g, '-'); 

    // Index 4000 to 6000 usually covers the 2003-2007 period in this dataset
    setPrices(priceRes.data.slice(4000, 6000)); 
    
    setMetrics({
      ...metricRes.data,
      detected_date: formattedTarget // Overwrite with the format the chart understands
    });
    
    setEvents(eventRes.data);
    setLoading(false);
  } catch (err) {
    console.error("Error:", err);
    setLoading(false);
  }
};
    fetchData();
  }, []);
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

      {/* Visualizer  */}
      <div className="chart-section">
        <h2>Historical Trend & Bayesian Change Points</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={prices}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="Date" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Price" stroke="#1e3a8a" dot={false} strokeWidth={2} />
              {/* Event Highlight */}
              <ReferenceLine x={metrics.detected_date} stroke="#dc2626" strokeWidth={3} label={{ value: 'Structural Break', fill: '#dc2626', position: 'top' }} />
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