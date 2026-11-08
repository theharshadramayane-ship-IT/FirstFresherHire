import { useState, useEffect } from 'react';
import { Search, Loader2, WifiOff, Code2, Briefcase, ArrowRight, Landmark } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchJobs } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import { db } from '../data/db';
import type { Job } from '../data/types';
import JobCard from '../components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  
  const [searchParams] = useSearchParams();
  const domain = searchParams.get('domain');
  const role = searchParams.get('role');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      setIsOffline(false);
      try {
        const queryToFetch = role ? role : debouncedSearch;
        const data = await fetchJobs(queryToFetch);
        setJobs(data);
        await db.jobs.clear();
        await db.jobs.bulkPut(data);
      } catch (error) {
        setIsOffline(true);
        const cachedJobs = await db.jobs.toArray();
        setJobs(cachedJobs);
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, [debouncedSearch, role]);

  return (
    // 👇 Yahan background class change ki hai aur base color soft green kiya hai
    <div className="relative min-h-screen bg-[#f8fafc] bg-nature-rain">
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 py-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Grow Your Career Naturally 🌱
          </h1>
          <p className="text-gray-600 mt-3 text-lg font-medium">
            Discover fresh opportunities and let your future bloom.
          </p>
        </div>

        {/* 3 CARDS GRID */}
        {!role && !domain && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            
            {/* Tech Card */}
            <Link to="/filter/tech" className="block group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 p-3 rounded-lg"><Code2 size={24} /></div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mt-4">Tech Jobs</h3>
                <p className="text-blue-100 text-xs mt-1">Private sector roles in IT & Software.</p>
              </div>
            </Link>

            {/* Govt Tech Card */}
            <Link to="/filter/govt" className="block group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 p-3 rounded-lg"><Landmark size={24} /></div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mt-4">Govt Tech Jobs</h3>
                <p className="text-emerald-100 text-xs mt-1">Engineering roles in PSUs & Govt.</p>
              </div>
            </Link>

            {/* Non-Tech Card */}
            <Link to="/filter/non-tech" className="block group">
              <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 p-3 rounded-lg"><Briefcase size={24} /></div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mt-4">Non-Tech Jobs</h3>
                <p className="text-orange-100 text-xs mt-1">HR, Sales, Marketing & Operations.</p>
              </div>
            </Link>
          </div>
        )}

        {(role || domain) && (
          <div className="mb-6 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 p-4 rounded-lg flex justify-between items-center shadow-sm">
            <p>Showing results for: <strong className="text-brand">{role}</strong> {domain && `in ${domain}`}</p>
            <Link to="/" className="text-sm font-semibold underline hover:text-brand">Clear Filter</Link>
          </div>
        )}

        {isOffline && (
          <div className="bg-orange-100 text-orange-700 p-3 rounded-lg mb-4 flex items-center gap-2">
            <WifiOff size={18} /> You are offline. Showing cached jobs.
          </div>
        )}

        <div className="relative mb-8">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" placeholder="Search jobs by title or category..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand shadow-lg bg-white/90 backdrop-blur-md"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand" size={40} /></div>
        ) : (
          <div className="grid gap-4">
            {jobs.length > 0 ? (
              jobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-center text-gray-500 py-10 bg-white/50 rounded-lg backdrop-blur-sm">No jobs found for "{role || search}".</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}