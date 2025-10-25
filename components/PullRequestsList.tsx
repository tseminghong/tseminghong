'use client';

import { PullRequest } from '@/lib/github';
import { GitPullRequest } from 'lucide-react';

interface PullRequestsProps {
  pullRequests: PullRequest[];
  loading?: boolean;
}

export default function PullRequestsList({ pullRequests, loading }: PullRequestsProps) {
  if (loading) {
    return <div className="text-center py-8">Loading pull requests...</div>;
  }

  if (pullRequests.length === 0) {
    return <div className="text-center py-8 text-slate-500 dark:text-slate-400">No pull requests found</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🔀</span>
        Recent Pull Requests
      </h3>
      <div className="space-y-3">
        {pullRequests.map((pr) => (
          <a
            key={pr.id}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-4 hover:bg-white/25 dark:hover:bg-slate-800/25 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <GitPullRequest className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors break-words line-clamp-2">
                    {pr.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-medium">
                      {pr.repo}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    pr.state === 'open'
                      ? 'bg-green-100/50 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-purple-100/50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  {pr.state}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
