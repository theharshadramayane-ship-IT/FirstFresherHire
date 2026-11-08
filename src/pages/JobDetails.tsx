import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, IndianRupee, Clock } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <Link to="/" className="text-brand flex items-center gap-2 mb-6 hover:underline">
        <ArrowLeft size={18} /> Back to Jobs
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Job Title (ID: {id})</h1>
            <p className="text-brand font-medium flex items-center gap-2 mt-2">
              <Building2 size={18} /> Tech Company
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-gray-600 mb-8 border-b pb-6">
          <span className="flex items-center gap-2"><MapPin size={18}/> Mumbai, India</span>
          <span className="flex items-center gap-2"><IndianRupee size={18}/> 8 LPA</span>
          <span className="flex items-center gap-2"><Clock size={18}/> Full-Time</span>
        </div>

        <div className="space-y-4 text-gray-600 mb-8">
          <h2 className="text-xl font-bold text-gray-800">Job Description</h2>
          <p>
            We are looking for a passionate Frontend Developer to join our core engineering team. 
            You will build responsive web interfaces, engineer client-side architectures, and collaborate closely with product design to ship polished user experiences.
          </p>
          <h3 className="font-bold text-gray-800 pt-4">Requirements:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deep knowledge of ECMAScript standards and browser internals.</li>
            <li>Experience with React, TypeScript, and modern CSS.</li>
            <li>Understanding of WCAG accessibility standards.</li>
          </ul>
        </div>

        <button className="w-full bg-brand text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}