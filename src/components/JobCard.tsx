import { Link } from 'react-router-dom';
import { MapPin, Clock, Building2 } from 'lucide-react';
import type { Job } from '../data/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-brand">
      
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

      <div className="mt-5 pt-4 border-t flex justify-between items-center">
        <span className="font-bold text-gray-800">{job.salary}</span>
        <Link 
          to={`/job/${job.id}`} 
          className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          aria-label={`View details for ${job.title}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}