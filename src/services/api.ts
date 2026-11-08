import type { Job } from '../data/types';

export const fetchJobs = async (searchQuery: string = ''): Promise<Job[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    return data.products.map((item: any) => ({
      id: item.id,
      title: item.title,
      company: item.brand || 'Tech Corp',
      location: 'Mumbai, India',
      salary: `$${item.price}`,
      type: 'Full-Time',
      tags: [item.category],
      posted: 'Recently',
      description: item.description
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};