import { Link } from 'react-router-dom';
import { MapPin, Clock, Building2, ExternalLink } from 'lucide-react';
import type { Job } from '../data/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  // Fallback link agar API se applyLink na aaye
  const finalApplyLink = job.applyLink || "https://www.google.com/search?q=jobs+for+" + encodeURIComponent(job.title);

  return (
    <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-brand relative overflow-hidden">
      
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{job.title}</h2>
          <p className="text-brand font-medium text-sm flex items-center gap-1 mt-1">
            <Building2 size={14} /> {job.company}
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
        <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
        <span className="flex items-center gap-1"><Clock size={14}/> {job.posted}</span>
      </div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {job.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* 👇 DIVIDER & SALARY AREA 👇 */}
      <div className="mt-5 pt-4 border-t flex justify-between items-center relative overflow-hidden group min-h-[60px]">
        
        {/* CASH RAIN BACKGROUND (Slow & Spaced) */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="money-rain absolute inset-0"></div>
        </div>

        {/* Salary Text */}
        <span className="font-extrabold text-gray-800 relative z-10 text-lg tracking-tight drop-shadow-sm">
          {job.salary}
        </span>
        
        {/* Buttons Area */}
        <div className="flex gap-3 relative z-10 shrink-0">
          <Link 
            to={`/job/${job.id}`} 
            className="text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors bg-white shadow-sm"
          >
            Details
          </Link>
          
          {/* 👇 SHINY APPLY BUTTON 👇 */}
          <a 
            href={finalApplyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group/btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
            <span className="relative z-10 flex items-center gap-1">Apply <ExternalLink size={14} /></span>
          </a>
        </div>
      </div>
    </article>
  );
}