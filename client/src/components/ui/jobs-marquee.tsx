'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import { Skeleton } from './skeleton';
import opportunitiesData from '@/data/opportunities.json';
import { Link } from 'wouter';

interface JobCard {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  url: string;
}

// Get first 5 real opportunities from JSON
const getRealJobs = (): JobCard[] => {
  if (!opportunitiesData || !opportunitiesData.opportunities) {
    return [];
  }
  
    return opportunitiesData.opportunities.slice(0, 10).map((opp: any, index: number) => ({
    id: opp.id || String(index),
    title: opp.title || 'Oportunidad sin título',
    company: opp.organization || opp.company || 'Empresa',
    location: opp.location || 'Ubicación no especificada',
    salary: opp.salary || undefined,
    url: `/opportunities/${opp.id}`,
  }));
};

const JobCardSkeleton = () => (
  <div className="flex-shrink-0 w-80 space-y-3 p-6 rounded-lg border border-slate-700 bg-slate-800/50">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const JobsMarquee: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<JobCard[]>([]);

  useEffect(() => {
    const realJobs = getRealJobs();
    setJobs(realJobs.length > 0 ? realJobs : []);
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
          {[...jobs, ...jobs].map((job, index) => (
            <Link key={`${job.id}-${index}`} href={job.url}>
              <motion.a
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
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default JobsMarquee;
