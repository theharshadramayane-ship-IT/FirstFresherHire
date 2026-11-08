export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-Time' | 'Remote' | 'Hybrid' | 'Internship';
  tags: string[];
  posted: string;
  description?: string;
}

export interface Assessment {
  id: string;
  role: string;
  company: string;
  status: 'Under Evaluation' | 'Shortlisted' | 'Rejected';
  submittedDate: string;
}