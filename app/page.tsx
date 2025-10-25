import { getRepositories, getRecentCommits, getPullRequests } from '@/lib/github';
import ProfileCard from '@/components/ProfileCard';
import StatsCard from '@/components/StatsCard';
import RepositoriesList from '@/components/RepositoriesList';
import CommitsList from '@/components/CommitsList';
import PullRequestsList from '@/components/PullRequestsList';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function Home() {
  const [repositories, commits, pullRequests] = await Promise.all([
    getRepositories(),
    getRecentCommits(),
    getPullRequests(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Background Blur Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            GitHub Portfolio
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Welcome to my GitHub showcase 🚀
          </p>
        </div>

        {/* Main Layout: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          {/* Right Content - Stats, Repos, Commits, PRs */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Section */}
            <StatsCard
              repositories={repositories}
              commits={commits}
              pullRequests={pullRequests}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Repositories & Languages */}
              <div className="space-y-8">
                <div className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 shadow-lg">
                  <RepositoriesList repositories={repositories} />
                </div>
              </div>

              {/* Right Column - Commits & PRs */}
              <div className="space-y-8">
                <div className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 shadow-lg">
                  <CommitsList commits={commits} />
                </div>

                <div className="rounded-2xl bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 shadow-lg">
                  <PullRequestsList pullRequests={pullRequests} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-600 dark:text-slate-400 border-t border-slate-300/20 dark:border-slate-700/20 pt-8">
          <p className="mb-2">
            Built with <span className="text-red-500">❤️</span> using Next.js, Tailwind CSS & GitHub API
          </p>
          <p className="text-sm">
            <a
              href="https://github.com/tseminghong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              Visit my GitHub profile →
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
