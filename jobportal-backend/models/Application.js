const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicant: String,   // ⭐ store name for easy display

  status: {
    type: String,
    default: "Applied",
    enum: ['Applied', 'Reviewed', 'Accepted', 'Rejected']
  }
}, { timestamps: true });

module.exports = mongoose.models.Application || mongoose.model("Application", applicationSchema);