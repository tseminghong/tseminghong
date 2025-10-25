'use client';

interface StatsProps {
  repositories: any[];
  commits: any[];
  pullRequests: any[];
}

export default function StatsCard({ repositories, commits, pullRequests }: StatsProps) {
  // Calculate language statistics
  const languageStats = repositories.reduce((acc: any, repo: any) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedLanguages = Object.entries(languageStats)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 6);

  const stats = [
    { label: 'Repositories', value: repositories.length, icon: '📂' },
    { label: 'Commits Pushed', value: commits.length, icon: '💾' },
    { label: 'Pull Requests', value: pullRequests.length, icon: '🔀' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 hover:bg-white/25 dark:hover:bg-slate-800/25 transition-all duration-300 shadow-lg"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <span className="mr-2">🗣️</span> Top Languages
        </h3>
        <div className="space-y-3">
          {sortedLanguages.length > 0 ? (
            sortedLanguages.map(([language, count]: any, idx: number) => {
              const percentage = (count / repositories.length) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {language}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {count} {count === 1 ? 'repo' : 'repos'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No language data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
