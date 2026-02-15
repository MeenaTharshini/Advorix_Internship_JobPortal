const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');


// ✅ GET ALL JOBS
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


// ✅ GET jobs by recruiter
router.get("/recruiter/:id", async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.params.id });
  res.json(jobs);
});


// ✅ GET single job by id
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});


// ✅ POST JOB (FIXED — recruiter from TOKEN, not frontend)
router.post("/", auth, async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    const job = new Job({
      title,
      company,
      location,
      description,
      recruiterId: req.user.id,   // ✅ from token, REAL ObjectId
    });

    await job.save();
    res.json({ message: "Job posted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ✅ UPDATE job
router.put("/:id", async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Job updated successfully" });
});


// ✅ DELETE job
router.delete('/:id', auth, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted successfully" });
});

module.exports = router;
