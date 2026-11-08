import type { Job } from '../data/types';

export const fetchJobs = async (searchQuery: string = ''): Promise<Job[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    const cities = ['Bangalore, India', 'Pune, India', 'Mumbai, India', 'Remote, India'];

    return data.products.map((item: any, index: number) => {
      // Random Indian Salary between 4 LPA to 15 LPA
      const salaryInLPA = Math.floor(Math.random() * (15 - 4 + 1)) + 4; 
      
      return {
        id: item.id,
        title: item.title,
        company: item.brand ? `${item.brand} Tech` : 'Tech Innovations',
        location: cities[index % cities.length], // Bangalore, Pune, etc.
        salary: `₹${salaryInLPA} LPA`, // Package format
        type: 'Full-Time',
        tags: [item.category, 'Fresher', 'On-site'],
        posted: 'Recently',
        description: item.description,
        // Apply link automatic based on job id
        applyLink: `https://careers.google.com/jobs/results/${item.id}` 
      };
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};