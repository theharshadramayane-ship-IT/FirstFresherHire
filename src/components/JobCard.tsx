import { Link } from 'react-router-dom';
import { MapPin, Clock, Building2, ExternalLink } from 'lucide-react';
import type { Job } from '../data/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
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

      {/* 👇 DIVIDER & SALARY AREA WITH CASH RAIN ANIMATION 👇 */}
      <div className="mt-5 pt-4 border-t flex justify-between items-center relative overflow-hidden group">
        
        {/* CASH RAIN BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {/* Background color change on hover for better visibility of notes */}
           <div className="absolute inset-0 bg-green-50/50"></div>
           <div className="money-rain absolute inset-0"></div>
        </div>

        {/* Salary Text */}
        <span className="font-extrabold text-gray-800 relative z-10 text-lg tracking-tight drop-shadow-sm">
          {job.salary}
        </span>
        
        {/* Buttons */}
        <div className="flex gap-2 relative z-10">
          <Link 
            to={`/job/${job.id}`} 
            className="text-gray-600 border border-gray-300 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            Details
          </Link>
          <a 
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-sm"
          >
            Apply <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}