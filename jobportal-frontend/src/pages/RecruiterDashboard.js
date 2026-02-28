import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load Logged-in User
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  // ✅ Fetch Recruiter's Jobs
  useEffect(() => {
    if (!user?._id) return;

    const token = localStorage.getItem("token");

    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `https://smis-jobportal-backend.onrender.com/api/jobs/recruiter/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setJobs(data);
        } else {
          console.error(data.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [user]);

  // ✅ Delete Job
  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://smis-jobportal-backend.onrender.com/api/jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== jobId)
        );
      } else {
        alert("Failed to delete job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">

      {/* ✅ Top Bar */}
      <div className="top-bar">
        <h2 className="welcome-text">
          Welcome, {user?.name || "Recruiter"} 👋
        </h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1>Recruiter Dashboard</h1>

      {/* ✅ Dashboard Actions */}
      <div className="dash-cards">
        <div
          className="dash-card"
          onClick={() => navigate("/postjob")}
        >
          <h2>Post New Job</h2>
        </div>

        <div
          className="dash-card"
          onClick={() => navigate("/applications")}
        >
          <h2>View Applications</h2>
        </div>
      </div>

      <h3>Your Posted Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="dash-cards">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="dash-card job-card"
            >
              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <div className="card-buttons">
                <button
                  className="btn btn-update"
                  onClick={() =>
                    navigate(`/editjob/${job._id}`)
                  }
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
