import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to Job Portal</h1>
      <p>Find jobs or hire talent easily</p>

      <div className="landing-buttons">
        <Link to="/login">
          <button className="primary">Login</button>
        </Link>

        <Link to="/signup">
          <button className="secondary">Signup</button>
        </Link>
      </div>
    </div>
  );
}
