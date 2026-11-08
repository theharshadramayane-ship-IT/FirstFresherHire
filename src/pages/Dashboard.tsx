import { useState } from 'react';
import { 
  CheckCircle2, Clock, Code2, Briefcase, ArrowRight, Landmark, 
  Video, FileText, ChevronRight, PlayCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 👇 MOCK DATA: Different companies with different interview stages
const applicationsData = [
  {
    id: "app-1",
    company: "The First Labs",
    role: "Associate Frontend Developer",
    status: "In Progress",
    currentStage: 2, // 0: Applied, 1: Aptitude, 2: Tech Interview, 3: HR, 4: Offer
    stages: [
      { name: "Application Review", date: "Nov 5, 2026", status: "completed" },
      { name: "Aptitude & Logic Test", date: "Nov 7, 2026", status: "completed" },
      { name: "Technical Live Interview", date: "Nov 14, 2026", status: "current" },
      { name: "Managerial Round", date: "TBD", status: "pending" },
    ],
    actionLink: "Join Live Interview", // Company will connect here
    actionIcon: Video
  },
  {
    id: "app-2",
    company: "TCS",
    role: "System Engineer",
    status: "Aptitude Pending",
    currentStage: 1,
    stages: [
      { name: "Application Review", date: "Nov 1, 2026", status: "completed" },
      { name: "TCS NQT Aptitude Test", date: "Nov 10, 2026", status: "current" },
      { name: "Technical Round", date: "TBD", status: "pending" },
      { name: "HR Round", date: "TBD", status: "pending" },
    ],
    actionLink: "Start Online Test", // Candidate can take test from dashboard
    actionIcon: PlayCircle
  },
  {
    id: "app-3",
    company: "Google",
    role: "UI/UX Engineer",
    status: "Rejected",
    currentStage: 1,
    stages: [
      { name: "Resume Shortlisting", date: "Oct 20, 2026", status: "completed" },
      { name: "Portfolio Review", date: "Oct 25, 2026", status: "rejected" },
    ],
    actionLink: null,
    actionIcon: null
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'active' | 'rejected'>('active');

  const activeApps = applicationsData.filter(app => app.status !== "Rejected");
  const rejectedApps = applicationsData.filter(app => app.status === "Rejected");

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
          <p className="text-gray-500 mt-1">Track your interview progress and join live tests.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gray-200 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${activeTab === 'active' ? 'bg-white shadow text-brand' : 'text-gray-600'}`}
          >
            Active ({activeApps.length})
          </button>
          <button 
            onClick={() => setActiveTab('rejected')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${activeTab === 'rejected' ? 'bg-white shadow text-red-600' : 'text-gray-600'}`}
          >
            Archived ({rejectedApps.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: Application Cards */}
        <div className="lg:col-span-2 space-y-6">
          {(activeTab === 'active' ? activeApps : rejectedApps).map((app) => (
            <section key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{app.role}</h2>
                  <p className="text-brand font-semibold text-sm mt-1">{app.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  app.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status}
                </span>
              </div>

              {/* Timeline & Action */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Timeline Steps */}
                <div className="sm:col-span-2 space-y-4">
                  {app.stages.map((stage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="mt-1">
                        {stage.status === 'completed' && <CheckCircle2 className="text-green-500" size={18} />}
                        {stage.status === 'current' && <div className="w-[18px] h-[18px] rounded-full border-4 border-blue-500 bg-white animate-pulse" />}
                        {stage.status === 'rejected' && <div className="w-[18px] h-[18px] rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">✕</div>}
                        {stage.status === 'pending' && <div className="w-[18px] h-[18px] rounded-full bg-gray-200 border border-gray-300" />}
                      </div>
                      
                      {/* Text */}
                      <div>
                        <p className={`text-sm font-semibold ${
                          stage.status === 'current' ? 'text-blue-700' : 
                          stage.status === 'rejected' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                          {stage.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{stage.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company Connection / Action Area */}
                <div className="sm:col-span-1 flex flex-col justify-center items-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                  {app.actionLink ? (
                    <>
                      <p className="text-xs text-gray-500 text-center mb-3">The company has invited you for the next step.</p>
                      <button 
                        onClick={() => alert(`Connecting to ${app.company} secure portal...`)}
                        className="w-full flex items-center justify-center gap-2 bg-brand text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                      >
                        {app.actionIcon && <app.actionIcon size={16} />} 
                        {app.actionLink}
                      </button>
                    </>
                  ) : (
                     <p className="text-xs text-gray-400 text-center">No pending actions.</p>
                  )}
                </div>

              </div>
            </section>
          ))}
          
          {activeTab === 'rejected' && rejectedApps.length === 0 && (
             <div className="text-center py-10 text-gray-400">No rejected applications.</div>
          )}
        </div>

        {/* RIGHT SIDE: Quick Links (Keep your 3 Tiles here) */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Explore More Jobs</h2>

          <Link to="/filter/tech" className="block group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Code2 size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Tech Jobs</h3>
            </div>
          </Link>

          <Link to="/filter/govt" className="block group">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Landmark size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Govt Tech Jobs</h3>
            </div>
          </Link>

          <Link to="/filter/non-tech" className="block group">
            <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Briefcase size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Non-Tech Jobs</h3>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}