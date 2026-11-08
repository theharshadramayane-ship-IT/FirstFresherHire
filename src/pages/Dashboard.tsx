import { CheckCircle2, Clock, Code2, Briefcase, ArrowRight } from 'lucide-react';
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
      
      {/* Grid Layout: Left side (2 columns), Right side (1 column) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT SIDE: Candidature Progress ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Card */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Assessment Status">
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                assessmentData.status === 'Under Evaluation' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
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

          {/* Timeline */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Hiring Timeline">
            <h3 className="font-bold text-gray-800 mb-6">Candidature Progress & Timeline</h3>
            
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
              <div className="relative pl-6">
                <div className="absolute -left-[17px] top-0 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle2 size={16} />
                </div>
                <h4 className="font-semibold text-gray-800">Round 1: Online Technical Assessment (OA)</h4>
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

        {/* ================= RIGHT SIDE: Big Tiles ================= */}
        <div className="lg:col-span-1 space-y-6">
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">Explore Jobs</h2>

          {/* Tech Job Tile */}
          <Link to="/?category=tech" className="block group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Code2 size={28} />
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold mt-4">Tech Jobs</h3>
              <p className="text-blue-100 text-sm mt-1">Frontend, Backend, Full Stack, AI & more.</p>
            </div>
          </Link>

          {/* Non-Tech Job Tile */}
          <Link to="/?category=non-tech" className="block group">
            <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Briefcase size={28} />
                </div>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold mt-4">Non-Tech Jobs</h3>
              <p className="text-orange-100 text-sm mt-1">HR, Sales, Marketing, Finance & more.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}