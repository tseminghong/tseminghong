'use client';

import { PROFILE_INFO } from '@/config/github';

export default function ProfileCard() {
  return (
    <div className="sticky top-24 h-fit rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/30 dark:hover:bg-slate-800/30">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
            <img
              src={PROFILE_INFO.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white/50"
            />
          </div>
        </div>

        {/* Profile Info */}
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {PROFILE_INFO.name}
        </h1>
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">
          {PROFILE_INFO.title}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {PROFILE_INFO.bio}
        </p>

        {/* Skills */}
        <div className="w-full space-y-3">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Skills & Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PROFILE_INFO.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub Links */}
        <div className="mt-6 w-full pt-6 border-t border-white/20 dark:border-slate-700/20 space-y-2">
          <a
            href="https://github.com/tseminghong"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 px-4 rounded-lg bg-blue-500/20 dark:bg-blue-900/20 hover:bg-blue-500/30 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm transition-all"
          >
            👤 GitHub Profile
          </a>
          <a
            href="https://github.com/tseminghong"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 px-4 rounded-lg bg-purple-500/20 dark:bg-purple-900/20 hover:bg-purple-500/30 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold text-sm transition-all"
          >
            🔗 Connect
          </a>
        </div>
      </div>
    </div>
  );
}
