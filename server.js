/**
 * server.js
 * Express server for local development (npm start or node server.js)
 * Compatible with Vercel serverless deployment via vercel.json
 * Serves the premium cyberpunk profile website
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root and public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Main route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check / API example (optional for future expansion)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Phạm Quang Vương Profile API running',
    timestamp: new Date().toISOString()
  });
});

// Catch-all for SPA-like behavior (Express 5 compatible)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server (local only, Vercel handles production)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  🚀 Cyberpunk Profile Server Started                      ║
║  Local:    http://localhost:${PORT}                        ║
║  Network:  http://127.0.0.1:${PORT}                        ║
║  Theme:    Dark Neon | Glassmorphism | RGB                ║
║  Owner:    Phạm Quang Vương | kingsore                    ║
╚════════════════════════════════════════════════════════════╝
    `);
  });
}

module.exports = app;
