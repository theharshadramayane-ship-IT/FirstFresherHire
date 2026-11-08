// src/pages/Dashboard.tsx
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { Assessment } from '../data/types';

// Mock data (In a real app, this comes from an API)
const assessmentData: Assessment = {
  id: "FED-2026",
  role: "Associate Frontend Developer",
  company: "The First Labs",
  status: "Under Evaluation",
  submittedDate: "2026-11-07",
};

export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Candidature Progress</h1>
      
      {/* Status Card */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8" aria-label="Assessment Status">
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
        <p className="text-gray-500 mt-2">Your responses for the {assessmentData.role} assessment have been recorded and securely queued for technical review.</p>
        <p className="text-sm text-gray-400 mt-4 flex items-center gap-2">
          <Clock size={16}/> Submitted on {assessmentData.submittedDate}
        </p>
      </section>

      {/* Timeline */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-label="Hiring Timeline">
        <h3 className="font-bold text-gray-800 mb-6">Candidature Progress & Timeline</h3>
        
        <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
          {/* Step 1: Completed */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] top-0 bg-green-500 text-white rounded-full p-1">
              <CheckCircle2 size={16} />
            </div>
            <h4 className="font-semibold text-gray-800">Round 1: Online Technical Assessment (OA)</h4>
            <p className="text-green-600 text-sm font-medium mt-1">Submitted on Nov 7, 2026</p>
            <p className="text-gray-500 text-sm mt-1">All 16 questions recorded and queued.</p>
          </div>

          {/* Step 2: In Progress */}
          <div className="relative pl-6">
            <div className="absolute -left-[17px] top-0 bg-orange-400 text-white rounded-full p-1 animate-pulse">
              <Clock size={16} />
            </div>
            <h4 className="font-semibold text-gray-800">Technical Evaluation & Shortlisting</h4>
            <p className="text-orange-500 text-sm font-medium mt-1">Expected by Nov 14, 2026</p>
            <p className="text-gray-500 text-sm mt-1">Detailed review of candidate problem-solving speed, accuracy, and engineering aptitude.</p>
          </div>
        </div>
      </section>
    </div>
  );
}