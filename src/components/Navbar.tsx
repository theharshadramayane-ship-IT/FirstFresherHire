import { Link } from 'react-router-dom';
import { Briefcase, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" aria-label="Main Navigation">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-xl font-bold text-brand flex items-center gap-2">
          <Briefcase size={24} /> FirstFresherHire
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-brand flex items-center gap-1 font-medium">
            <Briefcase size={18} /> Jobs
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-brand flex items-center gap-1 font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-brand flex items-center gap-1 font-medium">
            <User size={18} /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}