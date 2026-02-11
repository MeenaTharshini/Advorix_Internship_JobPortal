const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const Job = require("../models/Job");   // ⭐ MISSING LINE

router.post("/", async (req, res) => {
  const { userId, jobId } = req.body;

  const exists = await Application.findOne({ userId, jobId });
  if (exists) return res.json({ message: "Already applied" });

  const user = await User.findById(userId);

  const app = new Application({
    userId,
    jobId,
    applicant: user.name,   // ⭐ store name here
  });

  await app.save();

  res.json({ message: "Applied successfully" });
});


// Recruiter sees applications for their jobs
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      jobId: { $in: jobIds }
    })
      .populate("userId", "name email")
      .populate("jobId", "title company");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});
// Get applications by user
router.get("/user/:userId", async (req, res) => {
  const apps = await Application.find({ userId: req.params.userId });
  res.json(apps);
});
router.get("/recruiter/:recruiterId", async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.params.recruiterId });
  const jobIds = jobs.map(j => j._id);

  const apps = await Application.find({ jobId: { $in: jobIds } })
    .populate("jobId", "title company")
    .populate("userId", "name email");

  res.json(apps);
});




module.exports = router;
