// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { Search, Loader2, WifiOff } from 'lucide-react';
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
  
  // Custom Hook (Event Loop Concept)
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      setIsOffline(false);
      try {
        // 1. API Call (Network)
        const data = await fetchJobs(debouncedSearch);
        setJobs(data);
        
        // 2. IndexedDB mein save karein (Offline Support)
        await db.jobs.clear(); // Purana data clear karein
        await db.jobs.bulkPut(data); // Naya data save karein
        
      } catch (error) {
        // 3. Agar internet nahi hai, toh IndexedDB se data uthayein
        console.log("Offline mode: Loading from IndexedDB");
        setIsOffline(true);
        const cachedJobs = await db.jobs.toArray();
        setJobs(cachedJobs);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [debouncedSearch]);

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Discover Fresh Jobs</h1>
        <p className="text-gray-500 mt-2">Find opportunities before the crowd.</p>
      </div>

      {/* Offline Warning (A11y: aria-live batata hai ki screen reader ko announce karna hai) */}
      {isOffline && (
        <div className="bg-orange-100 text-orange-700 p-3 rounded-lg mb-4 flex items-center gap-2" aria-live="polite">
          <WifiOff size={18} /> You are offline. Showing cached jobs.
        </div>
      )}

      {/* Search Bar (A11y: aria-label) */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search jobs by title or category..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search jobs"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand" size={40} />
        </div>
      ) : (
        /* Job List */
        <div className="grid gap-4">
          {jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500 py-10">No jobs found for "{search}".</p>
          )}
        </div>
      )}
    </div>
  );
}