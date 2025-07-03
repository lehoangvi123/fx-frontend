import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TechnicalIndicators = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/rates/indicators')
      .then((res) => {
        if (res.data && res.data.success) {
          setData(res.data.indicators);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi lấy indicators:', err);
      });
  }, []);

  return (
    <div>
      <h2>📊 Technical Indicators</h2>
      {Object.keys(data).length === 0 ? (
        <p>Không lấy được dữ liệu chỉ số kỹ thuật.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>SMA</th>
              <th>EMA</th>
              <th>RSI</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([currency, indicators]) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{indicators.sma != null ? indicators.sma.toFixed(4) : 'N/A'}</td>
                <td>{indicators.ema != null ? indicators.ema.toFixed(4) : 'N/A'}</td>
                <td>{indicators.rsi != null ? indicators.rsi.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TechnicalIndicators;
