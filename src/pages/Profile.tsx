import { User, Mail, MapPin, Briefcase, LogOut } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-brand/10 text-brand p-4 rounded-full">
            <User size={40} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Harshad Raju Ramayane</h2>
            <p className="text-gray-500 text-sm">Frontend Developer</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <p className="flex items-center gap-3">
            <Mail size={18} className="text-gray-400" /> harshad@example.com
          </p>
          <p className="flex items-center gap-3">
            <MapPin size={18} className="text-gray-400" /> Mumbai, India
          </p>
          <p className="flex items-center gap-3">
            <Briefcase size={18} className="text-gray-400" /> Fresher (Looking for opportunities)
          </p>
        </div>
      </div>

      <button 
        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        onClick={() => alert('Logout feature coming soon!')}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}