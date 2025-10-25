import { GITHUB_USERNAME, GITHUB_TOKEN } from '@/config/github';

const API_BASE = 'https://api.github.com';

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` }),
};

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface PullRequest {
  id: number;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  repo: string;
}

export async function getRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch(
      `${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      { headers }
    );
    const repos = await response.json();

    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export async function getRecentCommits(): Promise<Commit[]> {
  try {
    const response = await fetch(
      `${API_BASE}/users/${GITHUB_USERNAME}/events?per_page=20`,
      { headers }
    );
    const events = await response.json();

    const commits = events
      .filter((event: any) => event.type === 'PushEvent' && event.payload?.commits)
      .slice(0, 5)
      .map((event: any) => {
        const payload = event.payload;
        const commit = payload.commits?.[0] || {};
        return {
          sha: commit.sha?.substring(0, 7) || 'unknown',
          message: commit.message || 'No message',
          author: event.actor.login,
          date: event.created_at,
          url: `${GITHUB_USERNAME}`,
        };
      });

    return commits;
  } catch (error) {
    console.error('Error fetching commits:', error);
    return [];
  }
}

export async function getPullRequests(): Promise<PullRequest[]> {
  try {
    const response = await fetch(
      `${API_BASE}/search/issues?q=is:pr+author:${GITHUB_USERNAME}&sort=updated&per_page=6`,
      { headers }
    );
    const data = await response.json();

    return data.items.map((pr: any) => ({
      id: pr.id,
      title: pr.title,
      url: pr.html_url,
      state: pr.state,
      createdAt: pr.created_at,
      repo: pr.repository_url.split('/').pop(),
    }));
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return [];
  }
}

export async function getUserProfile() {
  try {
    const response = await fetch(
      `${API_BASE}/users/${GITHUB_USERNAME}`,
      { headers }
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}
