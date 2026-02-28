import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://smis-jobportal-backend.onrender.com/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    alert(data.message);
    navigate("/login");
  };

  const handleGoToLogin = () => {
  navigate("/login");  // make sure this matches your route
};

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="seeker">Job Seeker</option>
          <option value="recruiter">Recruiter / Hiring</option>
        </select>
        <button type="submit">Signup</button>
        <button 
  type="button"
  onClick={handleGoToLogin}
  className="back-btn"
>
  Go Back to Login
</button>

      </form>
    </div>
  );
}
