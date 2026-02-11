const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  postedBy: String
});

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
