'use client';

import { Repository } from '@/lib/github';
import { Github, Star } from 'lucide-react';

interface RepositoriesProps {
  repositories: Repository[];
  loading?: boolean;
}

export default function RepositoriesList({ repositories, loading }: RepositoriesProps) {
  if (loading) {
    return <div className="text-center py-8">Loading repositories...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">📂</span>
        Recent Repositories
      </h3>
      <div className="space-y-3">
        {repositories.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-4 hover:bg-white/25 dark:hover:bg-slate-800/25 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {repo.name}
                </h4>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{repo.stars}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
              {repo.description || 'No description'}
            </p>
            <div className="flex items-center justify-between text-xs">
              {repo.language && (
                <span className="px-2 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium">
                  {repo.language}
                </span>
              )}
              <span className="text-slate-500 dark:text-slate-500">
                {new Date(repo.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
