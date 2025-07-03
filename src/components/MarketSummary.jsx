import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarketSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rates/summary')
      .then((res) => {
        if (res.data && res.data.success) {
          setSummary(res.data.summary);
        }
      })
      .catch((err) => {
        console.error('❌ Lỗi khi lấy dữ liệu tóm tắt thị trường:', err);
      });
  }, []);

  if (!summary) {
    return <p>⏳ Đang tải tóm tắt thị trường...</p>;
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      padding: '20px',
      backgroundColor: '#f7f9fc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center' }}>📈 Market Summary</h2>

      <p><strong>📊 Trung bình biến động:</strong> {summary.avgChange}%</p>
      <p><strong>🧠 Nhận định:</strong> {summary.sentiment}</p>

      <hr />

      <p><strong>📈 Đồng tăng mạnh nhất:</strong> {summary.topGainer.currency} ({summary.topGainer.changePercent.toFixed(2)}%)</p>
      <p><strong>📉 Đồng giảm mạnh nhất:</strong> {summary.topLoser.currency} ({summary.topLoser.changePercent.toFixed(2)}%)</p>
    </div>
  );
};

export default MarketSummary;
