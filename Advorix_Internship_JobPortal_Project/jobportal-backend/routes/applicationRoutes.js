const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Job = require("../models/Job");

// ✅ Apply for job
router.post("/", async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    const exists = await Application.findOne({ userId, jobId });
    if (exists) {
      return res.json({ message: "Already applied" });
    }

    const app = new Application({ userId, jobId });
    await app.save();

    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Recruiter sees applications
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      jobId: { $in: jobIds }
    })
      .populate("jobId", "title company")
      .populate("userId", "name email");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
