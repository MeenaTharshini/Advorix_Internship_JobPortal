require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));
app.get('/', (req, res) => {
    res.send('Job Portal Server is Running 🚀');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
