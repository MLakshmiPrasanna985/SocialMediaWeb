// const express = require('express');
// require('dotenv').config()
// const { default: mongoose } = require('mongoose');
// var cors = require('cors')
// const app = express();
// const port = 8000; // Define your desired port


// // Middleware to parse JSON requests
// app.use(express.json(),cors());
// const uri = process.env.MONGODB_URL; // Replace with your MongoDB URI and database name

// //connecting MongoDB
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//  const db=mongoose.connection;

// db.once('open',()=>console.log("Connected"))


// // Example route
// app.get('/', (req, res) => {
//   res.send('Hello, this is your Express app!');
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000; // Define your desired port

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Get MongoDB URI from .env
const uri = process.env.MONGODB_URL; // Replace with your MongoDB URI and database name

// MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Handling connection events
const db = mongoose.connection;

// Once connected successfully
db.once('open', () => {
  console.log("MongoDB Connected successfully!");
});

// Handle any connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Example route to check if the database is connected
app.get('/check-db', (req, res) => {
  // Simple MongoDB query to verify the connection
  mongoose.connection.db.admin().ping((err, result) => {
    if (err) {
      res.status(500).send("Failed to connect to MongoDB");
    } else {
      res.send("Connected to MongoDB successfully");
    }
  });
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express app!');
});

// User Route
const userRoute=require('./routes/userRoute');
app.use('/user',userRoute,cors());

// Post Route
const userRoute=require('./routes/postRoute');
app.use('/post',postRoute,cors());

// Comment Route
const commentRoute=require('./routes/commentRoute');
app.use('/comment',commentRoute,cors());

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
