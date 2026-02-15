import { useEffect, useState } from "react";
import "../styles/Applications.css";
export default function Applications() {
  const [apps, setApps] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/recruiter/${user._id}`)
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  return (
    <div className="container">
      <h2>Job Applications</h2>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map(app => (
  <div key={app._id} className="app-card">
    <p><b>Job:</b> {app.jobId.title}</p>
    <p><b>Company:</b> {app.jobId.company}</p>
    <p><b>Applicant:</b> {app.userId.name}</p>
    <p><b>Email:</b> {app.userId.email}</p>
    <p><b>Status:</b> {app.status}</p>
  </div>
))

      )}
    </div>
  );
}
