import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobDetails from './pages/JobDetails';
import CategoryFilter from './pages/CategoryFilter'; // Naya page import kiya

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job/:id" element={<JobDetails />} />
            
            {/* Naya Route add kiya hai tree filtering ke liye */}
            <Route path="/filter/:category" element={<CategoryFilter />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;