import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostJob.css";

export default function PostJob() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  // 🔐 Access Control
  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (!raw || raw === "undefined") {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(raw);

    if (parsedUser.role !== "recruiter") {
      navigate("/jobs");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  if (!user) return <p className="checking">Checking access...</p>;

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://smis-jobportal-backend.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Job posted successfully! 🎉");
        navigate("/recruiter-dashboard", { replace: true });
      } else {
        alert(data.message || "Error posting job");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="postjob-container">
      <div className="postjob-card">
        <h2>Post a New Job</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            onChange={handleChange}
            required
          />

          <button type="submit" className="post-btn">
            Post Job
          </button>

          {/* ✅ Back Home Button */}
          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate("/recruiter-dashboard")}
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
