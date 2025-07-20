const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const taskRoutes = require('./routes/tasks');

// Use routes
app.use('/api/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo List API' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 