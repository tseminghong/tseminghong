'use client';

import { Commit } from '@/lib/github';
import { GitCommit } from 'lucide-react';

interface CommitsProps {
  commits: Commit[];
  loading?: boolean;
}

export default function CommitsList({ commits, loading }: CommitsProps) {
  if (loading) {
    return <div className="text-center py-8">Loading commits...</div>;
  }

  if (commits.length === 0) {
    return <div className="text-center py-8 text-slate-500 dark:text-slate-400">No recent commits found</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💾</span>
        Recent Commits
      </h3>
      <div className="space-y-3">
        {commits.map((commit, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-4 hover:bg-white/25 dark:hover:bg-slate-800/25 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <GitCommit className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-slate-50 break-words truncate">
                  {commit.message}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-1 rounded-full bg-green-100/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-mono">
                    {commit.sha}
                  </span>
                  <span>by {commit.author}</span>
                  <span>•</span>
                  <span>{new Date(commit.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
