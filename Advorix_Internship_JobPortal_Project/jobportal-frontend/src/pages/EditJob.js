import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditJob.css";
export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data));
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    });

    alert("Job updated!");
    navigate("/recruiter-dashboard");
  };

  return (
    <div className="editjob-container">
    <h2 className="editjob-heading">Edit Job</h2>

    <br></br>
      <form className="editjob-form" onSubmit={handleUpdate}>
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button type="submit" className="btn-update">Update Job</button>
      </form>
    </div>
  );
}
