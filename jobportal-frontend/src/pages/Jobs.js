import { useEffect, useState } from "react";
import "../styles/Jobs.css";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
    skills: "",
    experience: ""
  });

  // ✅ Load logged-in user
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      setUser(JSON.parse(raw));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // ✅ Fetch all jobs
  useEffect(() => {
    fetch("https://smis-jobportal-backend.onrender.com/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  // ✅ Fetch applied jobs
  useEffect(() => {
    if (user?._id) {
      fetch(`https://smis-jobportal-backend.onrender.com/api/applications/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          const jobIds = data.map(app => app.jobId._id || app.jobId);
          setAppliedJobs(jobIds);
        })
        .catch(err => console.error("Error fetching applications:", err));
    }
  }, [user]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("https://smis-jobportal-backend.onrender.com/api/applications/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        jobId: selectedJob,
        ...formData
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setAppliedJobs(prev => [...prev, selectedJob]);
      setSelectedJob(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resumeLink: "",
        coverLetter: "",
        skills: "",
        experience: ""
      });
    } else {
      alert("Failed: " + (data.error || data.message));
    }
  };

  if (!user) return null;

  return (
    <div className="jobs-container">

      {/* ✅ Top Bar */}
      <div className="top-bar">
        <h2 className="welcome-text">
          Welcome, {user?.name || "User"} 👋
        </h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="jobs-heading">Available Jobs</h1>

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p className="meta">
              {job.company} • {job.location}
            </p>
            <p className="desc">{job.description}</p>

            {appliedJobs.includes(job._id) ? (
              <button className="btn applied" disabled>
                Applied ✅
              </button>
            ) : (
              <button
                className="btn apply"
                onClick={() => navigate(`/apply/${job._id}`)}
              >
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="application-modal">
          <div className="application-form">
            <h2>Apply for Job</h2>

            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "skills" && field !== "experience"}
                />
              ))}

              <div className="form-buttons">
                <button type="submit" className="btn apply">
                  Submit Application
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => setSelectedJob(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
