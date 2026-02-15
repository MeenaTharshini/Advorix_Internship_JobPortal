import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/recruiter/${user._id}`)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const deleteJob = async (jobId) => {
    await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
      method: "DELETE"
    });
    setJobs(jobs.filter(job => job._id !== jobId));
  };

  return (
    <div className="dashboard-container">
      <h1>Recruiter Dashboard</h1>
      <div className="dash-cards">
        <div className="dash-card" onClick={() => navigate("/postjob")}>
          <h2>Post New Job</h2>
        </div>
        <div className="dash-card" onClick={() => navigate("/applications")}>
          <h2>View Applications</h2>
        </div>
      </div>
      <h3>Your Posted Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="dash-cards">
          {jobs.map(job => (
  <div key={job._id} className="dash-card job-card">
    <h3>{job.title}</h3>
    <p>{job.company}</p>

    <div className="card-buttons">
      <button 
        className="btn btn-update"
        onClick={() => navigate(`/editjob/${job._id}`)}
      >
        Update
      </button>

      <button 
        className="btn btn-delete"
        onClick={() => deleteJob(job._id)}
      >
        Delete
      </button>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
}