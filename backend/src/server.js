const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

// MongoDB Connection
// 'mongodb+srv://(username):(password)' 
mongoose.connect('mongodb+srv://unimelb006:2023_Lbp_Unimelb006@lbp-client.hyvt7gp.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define Routes
// app.get('/api', (req, res) => {
app.get('/api', (req, res) => {
  res.send('CONNECTED TO DB.');
});


// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  exec('open http://localhost:4000/api');  // On macOS and Linux
  exec('start http://localhost:4000/api'); // On Windows
});

