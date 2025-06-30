import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import RateTable from './components/RateTable';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

// const socket = io('http://localhost:500'); 
const socket = io(process.env.REACT_APP_BACKEND_URL)

function App() {
  const [rate, setRate] = useState({});

  useEffect(() => {
    // axios.get('http://localhost:5000/api/rates/current') 
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/rates/current`)
      .then(res => {
        if (res.data.success) {
          setRate({ rate: res.data.rates });
        } else {
          console.warn('⚠ No rates available yet');
        }
      })
      .catch(err => console.error('❌ API error:', err));

    socket.on('rateUpdate', data => { 
      setRate(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <h4 className="text-2xl font-extrabold text-blue-700">FX Rate Dashboard</h4>
          </div>
          <nav className="space-x-4">
            <Link className="text-blue-600 hover:text-blue-800 font-medium" to="/">Home</Link>
            <Link className="text-blue-600 hover:text-blue-800 font-medium" to="/about">About</Link>
            <Link className="text-blue-600 hover:text-blue-800 font-medium" to="/contact">Contact</Link>
            <Link className="text-blue-600 hover:text-blue-800 font-medium" to="/setting">Setting</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-6">
        <Routes>
          <Route path="/" element={
            rate.rate ? (
              <div className="grid md:grid-cols-2 gap-6">
                <RateTable rates={rate.rate} />
                <CurrencyConverter />
              </div>
            ) : ( 
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500 animate-pulse">Loading exchange rates...</p>
              </div>
            )
          } />
          <Route path="/about" element={<p className="text-lg">About Page</p>} />
          <Route path="/contact" element={<p className="text-lg">Contact Page</p>} />
          <Route path="/setting" element={<p className="text-lg">Setting Page</p>} />
        </Routes>
      </main>

      <footer className="bg-white shadow-inner">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4 text-sm text-gray-600">
          <p>© 2025 FX Rate Dashboard. All rights reserved.</p>
          <div className="space-x-3 mt-2 md:mt-0">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/support" className="hover:underline">Support</a>
          </div>
        </div> 
      </footer>
    </div>
  );
}

export default App;
