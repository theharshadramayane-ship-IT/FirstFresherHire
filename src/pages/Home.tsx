import { useState, useEffect } from 'react';
import { Search, Loader2, WifiOff, Code2, Briefcase, ArrowRight } from 'lucide-react';
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
        // Agar role select hai (e.g. React Developer), toh wahi API mein bhejenge
        const queryToFetch = role ? role : debouncedSearch;
        const data = await fetchJobs(queryToFetch);
        
        setJobs(data);
        
        await db.jobs.clear();
        await db.jobs.bulkPut(data);
        
      } catch (error) {
        console.log("Offline mode: Loading from IndexedDB");
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
    <div className="max-w-5xl mx-auto p-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Discover Fresh Jobs</h1>
        <p className="text-gray-500 mt-2">Find opportunities before the crowd.</p>
      </div>

      {/* Tiles: Sirf tab dikhenge jab koi filter select nahi hoga */}
      {!role && !domain && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Link to="/filter/tech" className="block group">
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

          <Link to="/filter/non-tech" className="block group">
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
      )}

      {/* Selected Filter Info */}
      {(role || domain) && (
        <div className="mb-6 bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-lg flex justify-between items-center">
          <p>
            Showing results for: <strong>{role}</strong> {domain && `in ${domain}`}
          </p>
          <Link to="/" className="text-sm font-semibold underline hover:text-blue-600">
            Clear Filter
          </Link>
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
          type="text" 
          placeholder="Search jobs by title or category..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand" size={40} />
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500 py-10">No jobs found for "{role || search}".</p>
          )}
        </div>
      )}
    </div>
  );
}