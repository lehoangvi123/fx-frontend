import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Thay đổi nếu backend khác port

export default function MarketSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    socket.on('marketSummary', (data) => {
      console.log('📦 Nhận marketSummary:', data);
      setSummary(data);
    });

    return () => socket.off('marketSummary');
  }, []);

  if (!summary || !summary.topGainer || !summary.topLoser) {
    return <div>⏳ Đang tải tóm tắt thị trường...</div>;
  }

  return (
    <div style={{
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>📊 Tóm tắt thị trường</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li>🔺 <strong>Tăng mạnh nhất:</strong> {summary.topGainer.currency} ({summary.topGainer.changePercent?.toFixed(2) ?? 0}%)</li>
        <li>🔻 <strong>Giảm mạnh nhất:</strong> {summary.topLoser.currency} ({summary.topLoser.changePercent?.toFixed(2) ?? 0}%)</li>
        <li>📉 <strong>Biến động trung bình:</strong> {summary.avgChange}%</li>
        <li>📈 <strong>Tâm lý thị trường:</strong> {summary.sentiment}</li>
      </ul>
    </div>
  );
}
