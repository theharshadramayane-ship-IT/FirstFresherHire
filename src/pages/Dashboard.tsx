import { CheckCircle2, Clock, Code2, Briefcase, ArrowRight, Landmark } from 'lucide-react';
import type { Assessment } from '../data/types';
import { Link } from 'react-router-dom';

const assessmentData: Assessment = {
  id: "FED-2026",
  role: "Associate Frontend Developer",
  company: "The First Labs",
  status: "Under Evaluation",
  submittedDate: "2026-11-07",
};

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Candidature Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                {assessmentData.status}
              </span>
              <span className="text-brand font-bold text-sm">{assessmentData.id}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Assessment Submitted Successfully</h2>
            <p className="text-gray-500 mt-2">Your responses for the {assessmentData.role} assessment have been recorded.</p>
            <p className="text-sm text-gray-400 mt-4 flex items-center gap-2">
              <Clock size={16}/> Submitted on {assessmentData.submittedDate}
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-6">Candidature Progress & Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
              <div className="relative pl-6">
                <div className="absolute -left-[17px] top-0 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle2 size={16} />
                </div>
                <h4 className="font-semibold text-gray-800">Round 1: Online Technical Assessment</h4>
                <p className="text-green-600 text-sm font-medium mt-1">Submitted on Nov 7, 2026</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[17px] top-0 bg-orange-400 text-white rounded-full p-1 animate-pulse">
                  <Clock size={16} />
                </div>
                <h4 className="font-semibold text-gray-800">Technical Evaluation & Shortlisting</h4>
                <p className="text-orange-500 text-sm font-medium mt-1">Expected by Nov 14, 2026</p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE TILES */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Explore Jobs</h2>

          <Link to="/filter/tech" className="block group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Code2 size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Tech Jobs</h3>
              <p className="text-blue-100 text-xs mt-1">Frontend, Backend, AI & more.</p>
            </div>
          </Link>

          {/* NEW GOVT TILE */}
          <Link to="/filter/govt" className="block group">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Landmark size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Govt Tech Jobs</h3>
              <p className="text-emerald-100 text-xs mt-1">PSU, SSC JE, Railways & more.</p>
            </div>
          </Link>

          <Link to="/filter/non-tech" className="block group">
            <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2.5 rounded-lg"><Briefcase size={24} /></div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-bold mt-3">Non-Tech Jobs</h3>
              <p className="text-orange-100 text-xs mt-1">HR, Sales, Finance & more.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}