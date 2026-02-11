const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// GET all jobs  ✅ ADD THIS
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
});
// CREATE job (only logged in)
router.post('/', auth, async (req, res) => {
    try {
        const job = new Job({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            description: req.body.description,
            postedBy: req.user.name   // ⭐ THIS LINE IS THE MAGIC
        });

        await job.save();
        res.json({ message: "Job created" });

    } catch (err) {
        res.status(500).json({ message: "Error creating job" });
    }
});


// Update Job
router.put('/:id', auth, async (req, res) => {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Job updated successfully" });
});

// Delete Job
router.delete('/:id', auth, async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
});


module.exports = router;
