/**
 * server.js - Fixed for Express 5
 * Chạy tốt trên cả Express 4 và Express 5
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Route chính
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API health check (tùy chọn)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Profile server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ FIX: Dùng regex thay vì '*' để tương thích Express 5
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  🚀 Cyberpunk Profile Server Started                      ║
║  Local:    http://localhost:${PORT}                        ║
║  Theme:    Dark Neon | Glassmorphism | RGB                ║
╚════════════════════════════════════════════════════════════╝
  `);
});