import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Briefcase } from 'lucide-react';

const categoryData: Record<string, any> = {
  tech: {
    title: 'Tech Jobs',
    domains: {
      'Frontend Development': [
        'Frontend Developer', 'Frontend Engineer', 'UI Developer', 'React Developer', 
        'Angular Developer', 'Vue.js Developer', 'UI/UX Engineer', 'Frontend Architect', 
        'Design System Engineer', 'Web Accessibility Specialist (A11y)'
      ],
      'Backend Development': [
        'Backend Developer', 'Backend Engineer', 'Server-Side Developer', 'Node.js Developer', 
        'Java Developer', 'Python Developer', 'PHP Developer', 'Ruby on Rails Developer', 
        'Go (Golang) Developer', 'Backend Architect', 'API Developer', 'Microservices Engineer'
      ],
      'Full Stack Development': [
        'Full Stack Developer', 'Full Stack Engineer', 'MERN Stack Developer', 
        'MEAN Stack Developer', 'LAMP Stack Developer'
      ],
      'Mobile App Development': [
        'Android Developer', 'iOS Developer', 'Swift Developer', 'Kotlin Developer', 
        'React Native Developer', 'Flutter Developer', 'Xamarin Developer', 'Mobile App Engineer'
      ],
      'Data Science & AI': [
        'Data Scientist', 'Data Analyst', 'Data Engineer', 'Business Intelligence (BI) Analyst', 
        'Machine Learning Engineer', 'AI Engineer', 'NLP Engineer', 'Computer Vision Engineer', 
        'Deep Learning Engineer'
      ],
      'DevOps & Cloud': [
        'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Build & Release Engineer', 
        'Cloud Engineer', 'AWS Solutions Architect', 'Azure Administrator', 'GCP Engineer', 
        'Infrastructure Engineer', 'Platform Engineer'
      ],
      'QA & Testing': [
        'QA Tester', 'Manual Test Engineer', 'QA Automation Engineer', 
        'SDET (Software Development Engineer in Test)', 'Performance Test Engineer', 
        'Security Tester', 'Mobile App Tester'
      ],
      'Cybersecurity': [
        'Security Analyst', 'Penetration Tester (Ethical Hacker)', 'Cybersecurity Engineer', 
        'Security Architect', 'SOC (Security Operations Center) Analyst'
      ],
      'Database Administration': [
        'Database Administrator (DBA)', 'Database Engineer', 'SQL Developer', 'NoSQL Database Architect'
      ],
      'UI/UX & Product Design': [
        'UI Designer', 'UX Designer', 'Product Designer', 'UX Researcher', 'Interaction Designer'
      ]
    }
  },
  'non-tech': {
    title: 'Non-Tech Jobs',
    domains: {
      'Human Resources (HR)': [
        'HR Executive', 'HR Generalist', 'Talent Acquisition Specialist', 'Technical Recruiter', 
        'HR Operations', 'HR Business Partner (HRBP)', 'Payroll Specialist', 'Learning & Development (L&D) Manager'
      ],
      'Sales & Business Development': [
        'Sales Executive', 'Business Development Executive (BDE)', 'Inside Sales Representative', 
        'Account Executive', 'Enterprise Sales Manager', 'Pre-Sales Consultant', 'Sales Operations Analyst'
      ],
      'Marketing & Communications': [
        'Digital Marketing Executive', 'Content Writer', 'SEO Specialist', 'Social Media Manager', 
        'Performance Marketing Manager', 'Email Marketing Specialist', 'PR (Public Relations) Executive', 'Brand Manager'
      ],
      'Finance & Accounting': [
        'Accountant', 'Accounts Executive', 'Financial Analyst', 'Accounts Payable/Receivable Specialist', 
        'Tax Consultant', 'Auditor', 'Investment Banker', 'Chief Financial Officer (CFO)'
      ],
      'Operations & Supply Chain': [
        'Operations Executive', 'Supply Chain Analyst', 'Logistics Manager', 'Procurement Specialist', 
        'Inventory Manager', 'Warehouse Supervisor', 'Vendor Management Specialist'
      ],
      'Customer Support & Success': [
        'Customer Support Executive', 'Customer Success Manager (CSM)', 'Technical Support Engineer (Non-coding)', 
        'Call Center Agent', 'Client Relationship Manager', 'Helpdesk Coordinator'
      ],
      'Product Management': [
        'Product Manager (PM)', 'Associate Product Manager (APM)', 'Product Owner', 
        'Product Analyst', 'Growth Product Manager'
      ],
      'Project & Program Management': [
        'Project Manager', 'Program Manager', 'Project Coordinator', 'Scrum Master', 
        'Agile Coach', 'PMO (Project Management Office) Analyst'
      ],
      'Legal & Compliance': [
        'Corporate Lawyer', 'Legal Counsel', 'Compliance Officer', 'Paralegal', 
        'Contract Manager', 'Intellectual Property (IP) Specialist'
      ],
      'Administration & Office Management': [
        'Office Administrator', 'Executive Assistant (EA)', 'Front Desk Executive', 
        'Office Manager', 'Facilities Coordinator'
      ]
    }
  },
  // 👇 NAYA GOVT SECTION ADD KIYA HAI
  govt: {
    title: 'Government Tech Jobs',
    domains: {
      'Civil Engineering': [
        'Junior Engineer (JE)', 'Assistant Engineer (AE)', 'Executive Trainee'
      ],
      'Electrical Engineering': [
        'Junior Engineer (JE)', 'Assistant Engineer', 'Executive Trainee', 'JTO'
      ],
      'Mechanical Engineering': [
        'Junior Engineer (JE)', 'Assistant Engineer', 'Executive Trainee', 'Management Trainee'
      ],
      'Electronics & Comm. (ECE)': [
        'Junior Engineer (JE)', "Scientist 'B'", 'Technical Officer', 'JTO'
      ],
      'Computer Science / IT': [
        "Scientist 'B'", 'IT Specialist', 'Assistant Engineer (IT)', 'Software Engineer'
      ],
      'Data Science & AI': [
        "Scientist 'B' (DS/AI)", 'Data Analyst', 'Research Associate'
      ],
      'Chemical Engineering': [
        'Executive Trainee', 'Management Trainee', 'Engineer'
      ],
      'Instrumentation': [
        'Executive Trainee', 'Junior Engineer', 'Technical Assistant'
      ],
      'Mining / Metallurgy': [
        'Management Trainee (Technical)', 'Mining Sirdar', 'Assistant Foreman'
      ],
      'Aeronautical / Aerospace': [
        'Scientist/Engineer', 'Technical Officer'
      ]
    }
  }
};

export default function CategoryFilter() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const currentCategory = categoryData[category || ''];

  if (!currentCategory) {
    return <div className="p-8 text-center text-red-500">Category not found!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          Select {currentCategory.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Domains */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[600px] overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-700 mb-4 px-2 sticky top-0 bg-white pb-2 z-10">1. Choose a Domain</h2>
          <div className="space-y-2">
            {Object.keys(currentCategory.domains).map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedDomain === domain ? 'bg-brand text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium text-sm">{domain}</span>
                <ChevronRight size={18} className="shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[600px] overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-700 mb-4 px-2 sticky top-0 bg-white pb-2 z-10">2. Choose a Role</h2>
          {!selectedDomain ? (
            <div className="text-center py-10 text-gray-400 flex flex-col items-center">
              <Briefcase size={32} className="mb-2 opacity-50" />
              <p>Please select a domain first.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentCategory.domains[selectedDomain].map((role: string) => (
                <button
                  key={role}
                  onClick={() => navigate(`/?category=${category}&domain=${selectedDomain}&role=${role}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-gray-700 hover:bg-brand/10 hover:text-brand transition-colors group border border-transparent hover:border-brand/20"
                >
                  <div className="bg-gray-100 p-2 rounded-full group-hover:bg-white shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <span className="font-medium text-sm">{role}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}