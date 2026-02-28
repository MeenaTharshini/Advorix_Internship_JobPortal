import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ApplyJob.css";
function ApplyJob() {
  const { id } = useParams(); // job id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://smis-jobportal-backend.onrender.com/api/applications/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        jobId: id,
        ...formData
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Successfully Applied! 🎉");
      navigate("/jobs");
    } else {
      alert(data.message || "Application failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  return (
  <div className="apply-container">
    <div className="apply-card">
      <h2>Apply for the Job</h2>

      <form className="apply-form" onSubmit={handleSubmit}>
        <input 
          name="fullName" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
        />

        <input 
          name="email" 
          type="email"
          placeholder="Email" 
          onChange={handleChange} 
          required 
        />

        <input 
          name="phone" 
          placeholder="Phone" 
          onChange={handleChange} 
          required 
        />

        <input 
          name="resumeLink" 
          placeholder="Resume Link" 
          onChange={handleChange} 
        />

        <textarea 
          name="coverLetter" 
          placeholder="Cover Letter"
          rows="3"
          onChange={handleChange} 
        />

        <input 
          name="skills" 
          placeholder="Skills" 
          onChange={handleChange} 
        />

        <input 
          name="experience" 
          placeholder="Experience" 
          onChange={handleChange} 
        />

        <button type="submit" className="apply-button">
          Submit Application
        </button>
        <button 
  type="button" 
  className="back-button"
  onClick={() => navigate("/jobs")}
>
  ← Back to Jobs
</button>

      </form>
    </div>
  </div>
);

}

export default ApplyJob;
