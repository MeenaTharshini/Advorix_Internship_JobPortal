import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Applications from "./pages/Applications";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/editjob/:id" element={<EditJob />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
