import { useEffect, useState } from "react";
import "../styles/Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/applications/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          const jobIds = data.map(app => app.jobId);
          setAppliedJobs(jobIds);
        });
    }
  }, [user]);

  const applyJob = async (jobId) => {
    const res = await fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        jobId: jobId
      }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) {
      setAppliedJobs(prev => [...prev, jobId]);
    }
  };

  if (!user) return <p>Please login</p>;

  return (
    <div className="jobs-container">
      <h1 className="jobs-heading">Available Jobs</h1>
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p className="meta">{job.company} • {job.location}</p>
            <p className="desc">{job.description}</p>
            <div className="btn-group">
              {appliedJobs.includes(job._id) ? (
                <button className="btn applied">Applied ✅</button>
              ) : (
                <button className="btn apply" onClick={() => applyJob(job._id)}>Apply Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}