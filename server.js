const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mailserver', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use Routes
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});