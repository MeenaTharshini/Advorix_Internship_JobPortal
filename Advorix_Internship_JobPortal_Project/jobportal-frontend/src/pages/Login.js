import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 🛑 Protect from undefined user
      if (!data.user) {
        alert("Server did not return user data");
        return;
      }

      // ✅ Save safely
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);   // ⭐ THE MISSING LINE

      alert("Login successful!");

      // ✅ Navigate safely
      if (data.user.role === "seeker") {
        navigate("/jobs");
      } else if (data.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        alert("Invalid role from server");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
