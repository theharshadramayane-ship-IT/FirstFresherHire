import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Briefcase } from 'lucide-react';

// Data Structure for Categories, Domains, and Roles
const categoryData = {
  tech: {
    title: 'Tech Jobs',
    domains: {
      'Frontend Development': ['Frontend Developer', 'React Developer', 'Angular Developer', 'UI Developer'],
      'Backend Development': ['Backend Developer', 'Node.js Developer', 'Java Developer', 'Python Developer'],
      'Full Stack Development': ['Full Stack Developer', 'MERN Stack Developer'],
      'Data Science & AI': ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    }
  },
  'non-tech': {
    title: 'Non-Tech Jobs',
    domains: {
      'Human Resources (HR)': ['HR Executive', 'Technical Recruiter', 'HR Generalist'],
      'Sales & Marketing': ['Sales Executive', 'Digital Marketing Executive', 'Business Development Executive'],
      'Finance & Accounting': ['Accountant', 'Financial Analyst', 'Tax Consultant'],
      'Customer Support': ['Customer Support Executive', 'Customer Success Manager'],
    }
  }
};

export default function CategoryFilter() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // TypeScript safety check
  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return <div className="p-8 text-center text-red-500">Category not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          Select {currentCategory.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Domains */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4 px-2">1. Choose a Domain</h2>
          <div className="space-y-2">
            {Object.keys(currentCategory.domains).map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedDomain === domain
                    ? 'bg-brand text-white shadow-md'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium">{domain}</span>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Roles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4 px-2">2. Choose a Role</h2>
          
          {!selectedDomain ? (
            <div className="text-center py-10 text-gray-400 flex flex-col items-center">
              <Briefcase size={32} className="mb-2 opacity-50" />
              <p>Please select a domain first.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentCategory.domains[selectedDomain as keyof typeof currentCategory.domains].map((role) => (
                <button
                  key={role}
                  // Navigate to Home page with domain and role as URL parameters
                  onClick={() => navigate(`/?domain=${selectedDomain}&role=${role}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-gray-700 hover:bg-brand/10 hover:text-brand transition-colors group border border-transparent hover:border-brand/20"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-white">
                    <Briefcase size={16} />
                  </div>
                  <span className="font-medium">{role}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}