import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Applications.css";
import axios from "axios";
export default function Applications() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
  .get(`https://smis-jobportal-backend.onrender.com/api/applications/recruiter/${user._id}`)
  .then(res => setApps(res.data))
  .catch(err => console.error("Error fetching applications:", err));
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div className="container">

      {/* ✅ HERE IS THE BUTTON */}
      <button
        className="back-dashboard-btn"
        onClick={() => navigate("/recruiter-dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h2>Job Applications</h2>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map(app => (
          <div key={app._id} className="app-card">
            <p><b>Job:</b> {app.jobId?.title}</p>
            <p><b>Company:</b> {app.jobId?.company}</p>
            <p><b>Applicant:</b> {app.userId?.name}</p>
            <p><b>Email:</b> {app.userId?.email}</p>
            <p><b>Status:</b> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
