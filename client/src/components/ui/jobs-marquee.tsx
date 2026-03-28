'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import { Skeleton } from './skeleton';

interface JobCard {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  url: string;
}

const sampleJobs: JobCard[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120k - $150k',
    url: 'https://example.com/job/1',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Buenos Aires',
    salary: '$100k - $130k',
    url: 'https://example.com/job/2',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'Remote',
    salary: '$80k - $110k',
    url: 'https://example.com/job/3',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Asunción',
    salary: '$110k - $140k',
    url: 'https://example.com/job/4',
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'Remote',
    salary: '$130k - $160k',
    url: 'https://example.com/job/5',
  },
];

const JobCardSkeleton = () => (
  <div className="flex-shrink-0 w-80 space-y-3 p-6 rounded-lg border border-slate-700 bg-slate-800/50">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const JobsMarquee: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      {isLoading ? (
        <div className="flex gap-6 px-8 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex gap-6 px-8"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...sampleJobs, ...sampleJobs].map((job, index) => (
            <motion.a
              key={`${job.id}-${index}`}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.05 }}
              className="flex-shrink-0 w-80 p-6 rounded-lg border border-[#c9a84c]/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-[#c9a84c]/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-[#c9a84c] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{job.company}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors flex-shrink-0" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  <span>{job.location}</span>
                </div>

                {job.salary && (
                  <div className="text-sm font-medium text-[#c9a84c]">{job.salary}</div>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default JobsMarquee;
