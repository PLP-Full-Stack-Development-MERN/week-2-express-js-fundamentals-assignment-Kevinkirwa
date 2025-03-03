require('dotenv').config();
const express = require('express');
const app = express();

// Import middleware and routes
const logger = require('./middleware/logger');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Parse JSON request bodies
app.use(express.json());

// Apply custom logger middleware globally
app.use(logger);

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
