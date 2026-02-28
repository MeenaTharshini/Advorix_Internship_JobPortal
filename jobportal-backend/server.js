require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://smis-jobportal-frontend.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

// ✅ Serve React frontend
const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

app.get("/*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(buildPath, "index.html"));
  }
});

// ✅ Connect MongoDB THEN start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));