import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library
import './index.css';

const App = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL'); // New Filter State
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get('/.netlify/functions/api/listings'); 
      if (Array.isArray(res.data) && res.data.length > 0) {
        setListings(res.data);
      } else {
        throw new Error("Empty");
      }
    } catch (err) {
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    setListings([
      { _id: '1', name: 'Mama Solar (Nairobi)', kwh: 120, price: 15, type: 'SOLAR' },
      { _id: '2', name: 'City Grid Share', kwh: 500, price: 22, type: 'GRID' },
      { _id: '3', name: 'Sunny Side Up', kwh: 75, price: 12, type: 'SOLAR' },
      { _id: '4', name: 'Green BioGas', kwh: 200, price: 10, type: 'BIO' },
    ]);
  };

  const handleBuy = (item) => {
    // 1. Vibration feedback (if supported) for realism
    if (navigator.vibrate) navigator.vibrate(50);
    
    setReceipt({
      id: "TXN-" + Math.floor(Math.random() * 100000),
      item: item.name,
      amount: item.price * 10,
      kwh: 10,
      date: new Date().toLocaleString()
    });
  };

  // Filter Logic
  const filteredListings = listings.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'SOLAR') return item.type === 'SOLAR';
    if (filter === 'GRID') return item.type === 'GRID';
    return true;
  });

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <img src="/logo.png" alt="SOKO Logo" onError={(e) => e.target.style.display='none'} className="app-logo" />
          <h1>SOKO</h1>
        </div>
        <p>Peer-to-Peer Energy Marketplace</p>
      </header>

      <div className="filter-bar">
        {['ALL', 'SOLAR', 'GRID'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main>
        {loading && <p className="status">📡 Scanning Local Grid...</p>}
        
        <motion.div layout className="grid">
          <AnimatePresence>
            {filteredListings.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item._id} 
                className="card"
              >
                <div className="tag">{item.type}</div>
                <div className="icon">{item.type === 'SOLAR' ? '☀️' : item.type === 'GRID' ? '⚡' : '🌱'}</div>
                <h3>{item.name}</h3>
                <p className="kwh">{item.kwh} kWh available</p>
                <div className="price-tag">{item.price} KES <span className="unit">/unit</span></div>
                <button onClick={() => handleBuy(item)} className="buy-btn">Buy Now</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* --- MOVED TO BOTTOM FOR HIGHER PRIORITY --- */}
      <AnimatePresence>
        {receipt && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <div className="receipt-card">
              <div className="check-icon">✓</div>
              <h2>Payment Successful</h2>
              <div className="receipt-details">
                <div className="row"><span>To:</span> <strong>{receipt.item}</strong></div>
                <div className="row"><span>Units:</span> <strong>{receipt.kwh} kWh</strong></div>
                <div className="row"><span>Total:</span> <strong>{receipt.amount} KES</strong></div>
                <div className="row small"><span>Ref:</span> {receipt.id}</div>
              </div>
              <button onClick={() => setReceipt(null)} className="close-btn">Done</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);