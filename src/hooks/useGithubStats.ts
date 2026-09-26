import { useEffect, useState } from 'react';
import { githubUsername } from '@/config/profile';

export interface GithubStats {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: string[];
  pinnedRepos: { name: string; description: string | null; url: string; stars: number }[];
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

/**
 * Integration GitHub 100 % statique et sans cle secrete :
 * appel direct de l'API publique `api.github.com` depuis le navigateur
 * (CORS autorise). Aucune donnee n'est stockee, aucun backend requis.
 *
 * Si le nom d'utilisateur n'est pas renseigne dans `src/config/profile.ts`,
 * la requete n'est jamais lancee et les donnees statiques sont utilisees.
 */
export function useGithubStats() {
  const [status, setStatus] = useState<Status>('idle');
  const [stats, setStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    if (!USERNAME_RE.test(githubUsername)) return;

    const controller = new AbortController();
    setStatus('loading');

    const load = async () => {
      try {
        const headers = { Accept: 'application/vnd.github+json' } as const;
        const userResponse = await fetch(
          `https://api.github.com/users/${encodeURIComponent(githubUsername)}`,
          { signal: controller.signal, headers },
        );

        if (!userResponse.ok) throw new Error(`GitHub API ${userResponse.status}`);
        const user = (await userResponse.json()) as {
          login: string;
          name: string | null;
          avatar_url: string;
          html_url: string;
          public_repos: number;
          followers: number;
          following: number;
        };

        const reposResponse = await fetch(
          `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?per_page=100&sort=updated`,
          { signal: controller.signal, headers },
        );
        const repos = reposResponse.ok
          ? ((await reposResponse.json()) as {
              name: string;
              description: string | null;
              html_url: string;
              stargazers_count: number;
              fork: boolean;
              language: string | null;
            }[])
          : [];

        const languageCount = new Map<string, number>();
        let totalStars = 0;
        for (const repo of repos) {
          if (!repo.fork) totalStars += repo.stargazers_count;
          if (repo.language)
            languageCount.set(repo.language, (languageCount.get(repo.language) ?? 0) + 1);
        }

        const topLanguages = [...languageCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([language]) => language);

        const pinnedRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3)
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
          }));

        setStats({
          login: user.login,
          name: user.name,
          avatarUrl: user.avatar_url,
          url: user.html_url,
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalStars,
          topLanguages,
          pinnedRepos,
        });
        setStatus('success');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('error');
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return { status, stats };
}
