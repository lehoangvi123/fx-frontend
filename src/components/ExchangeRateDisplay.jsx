// 📁 components/ExchangeRateDisplay.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ExchangeRateDisplay() {
  const [rates, setRates] = useState({});
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    socket.on('rateUpdate', (data) => {
        console.log("Received rateUpdate: ", data);
        setRates(data);
    });

    socket.on('rateAnomalies', (data) => {
      setAnomalies(data);
    });

    return () => {
      socket.off('rateUpdate');
      socket.off('rateAnomalies');
    };
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>💱 Exchange Rates</h2>

      {anomalies.length > 0 && (
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffeeba' }}>
          <strong>⚠️ Cảnh báo tỷ giá bất thường:</strong>
          <ul>
            {anomalies.map((a, index) => (
              <li key={index}>
                {a.currency}: {a.oldValue} → {a.newValue} ({a.changePercent}%)
              </li>
            ))}
          </ul>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Currency</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([code, value]) => (
            <tr key={code}>
              <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{code}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
