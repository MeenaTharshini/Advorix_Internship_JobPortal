import { useEffect, useState } from "react";

export default function RecruiterApplications() {
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`https://smis-jobportal-backend.onrender.com/api/applications/recruiter/${user._id}`)
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`https://smis-jobportal-backend.onrender.com/api/applications/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    setApplications(applications.map(app =>
      app._id === id ? { ...app, status } : app
    ));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Applications</h2>

      {applications.map(app => (
        <div key={app._id} style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px"
        }}>
          <h3>{app.fullName}</h3>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>Phone:</strong> {app.phone}</p>
          <p><strong>Resume:</strong> {app.resumeLink}</p>
          <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
          <p><strong>Skills:</strong> {app.skills}</p>
          <p><strong>Experience:</strong> {app.experience}</p>
          <p><strong>Status:</strong> {app.status}</p>

          {(app.status === "Pending" || app.status === "Applied") && (
  <>
    <button onClick={() => updateStatus(app._id, "Accepted")}>
      Accept
    </button>

    <button onClick={() => updateStatus(app._id, "Rejected")}>
      Reject
    </button>
  </>
)}

        </div>
      ))}
    </div>
  );
}
