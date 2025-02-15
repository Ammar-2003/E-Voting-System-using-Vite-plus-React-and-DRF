import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./assets/components/sidenav";
import Navbar from "./assets/components/Navbar";
import ErrorBoundary from "./assets/components/ErrorBoundary";

// Importing Views
import Dashboard from "./assets/views/Dashboard";
import Login from "./assets/views/Login";
import VotePage from "./assets/views/VotePage";
import AdminPanel from "./assets/views/AdminPanel";
import Candidates from "./assets/views/Candidates"; // Fixed typo
import Results from "./assets/views/Results";
import UserProfile from "./assets/views/UserProfile";
import NotFound from "./assets/views/NotFound";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Wrap Sidebar in Error Boundary */}
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vote" element={<VotePage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/results" element={<Results />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
