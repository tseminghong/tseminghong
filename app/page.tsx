import { getRepositories, getRecentCommits, getPullRequests } from '@/lib/github';
import { PROFILE_INFO } from '@/config/github';
import Image from 'next/image';

export default async function Home() {
  const [repositories, commits, pullRequests] = await Promise.all([
    getRepositories(),
    getRecentCommits(),
    getPullRequests(),
  ]);

  // Dopamine Colors
  const colors = {
    pink: '#FF0080',
    cyan: '#00E5FF',
    yellow: '#FFEA00',
    lime: '#76FF03',
    purple: '#AA00FF',
    black: '#000000',
    white: '#FFFFFF',
  };

  const skills = PROFILE_INFO.skills;
  
  const repos = repositories.slice(0, 4).map((repo, i) => {
    const colorKeys = ['pink', 'cyan', 'yellow', 'lime'] as const;
    return {
      name: repo.name,
      desc: repo.description || 'No description available',
      lang: repo.language || 'N/A',
      color: colors[colorKeys[i % colorKeys.length]],
      url: repo.url,
    };
  });

  return (
    <div className="min-h-screen p-4 md:p-8 font-mono-comic" style={{ backgroundColor: colors.cyan }}>
      
      {/* COMIC HALFTONE BACKGROUND OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ 
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">

        {/* HERO SECTION: The "Title Card" */}
        <header className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col md:flex-row items-center gap-8 rounded-lg transform hover:-translate-y-1 transition-transform duration-200">
          
          {/* Profile Pic with "Burst" Background */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-yellow-400 rounded-full scale-110 border-4 border-black animate-pulse"></div>
            <Image 
              src="https://github.com/tseminghong.png" 
              alt="Profile" 
              width={128}
              height={128}
              className="w-32 h-32 rounded-full border-4 border-black relative z-10 bg-white"
            />
            {/* Speech Bubble */}
            <div className="absolute -top-6 -right-12 bg-white border-4 border-black px-4 py-1 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block">
              <p className="font-bold text-black text-sm">Hey there! 👋</p>
              <div className="absolute bottom-0 left-4 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r-4 border-b-4 border-black"></div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-2 font-comic" style={{ textShadow: `4px 4px 0px ${colors.pink}` }}>
              {PROFILE_INFO.name}
            </h1>
            <p className="text-xl font-bold border-b-4 border-black inline-block mb-4">{PROFILE_INFO.title}</p>
            <p className="text-lg font-medium text-gray-800 max-w-lg">
              {PROFILE_INFO.bio} 🚀
            </p>
            
            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a href="https://github.com/tseminghong" className="px-6 py-3 bg-[#FF0080] text-white font-bold text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                GitHub Profile
              </a>
              <button className="px-6 py-3 bg-[#76FF03] text-black font-bold text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                Connect ⚡
              </button>
            </div>
          </div>
        </header>

        {/* STATS STRIP: Like comic narration boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Repositories', val: String(repositories.length).padStart(2, '0'), color: colors.yellow },
            { label: 'Commits', val: String(commits.length).padStart(2, '0'), color: colors.purple },
            { label: 'Pull Requests', val: String(pullRequests.length).padStart(2, '0'), color: colors.pink }
          ].map((stat, i) => (
            <div key={i} className="bg-white border-4 border-black p-4 flex items-center justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-bold text-xl uppercase">{stat.label}</span>
              <span className="text-4xl font-black font-comic" style={{ color: stat.color }}>{stat.val}</span>
            </div>
          ))}
        </div>

        {/* SKILLS CLOUD */}
        <section className="bg-[#AA00FF] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          <h2 className="text-3xl font-black text-white uppercase mb-6 text-center md:text-left border-b-4 border-black inline-block pb-1 font-comic">
            Superpowers ⚡
          </h2>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-white border-4 border-black font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* RECENT WORK: Comic Panels Layout */}
        <section>
          <div className="bg-black text-white inline-block px-6 py-2 transform -skew-x-12 mb-6 border-4 border-white shadow-[4px_4px_0px_0px_#FF0080]">
            <h2 className="text-3xl font-black uppercase not-italic transform skew-x-12 font-comic">Latest Issues (Repos)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, i) => (
              <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="group block bg-white border-4 border-black p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                {/* Decorative Corner Triangle */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-black clip-path-triangle"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black uppercase underline decoration-4 font-comic" style={{ textDecorationColor: repo.color }}>
                    {repo.name}
                  </h3>
                  <span className="text-xs font-bold border-2 border-black px-2 py-1 bg-gray-100 uppercase">
                    {repo.lang}
                  </span>
                </div>
                
                <p className="font-medium text-gray-800 mb-4 h-12 line-clamp-2">
                  {repo.desc}
                </p>
                
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span className="w-3 h-3 rounded-full border-2 border-black" style={{ backgroundColor: repo.color }}></span>
                  READ MORE →
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-8 font-bold bg-white border-t-4 border-black mt-12">
          <p>Built with ❤️ and <span style={{ color: colors.pink }}>Next.js</span></p>
          <p className="text-sm text-gray-500 mt-2">Original Design by tseminghong</p>
        </footer>

      </div>
    </div>
  );
}
