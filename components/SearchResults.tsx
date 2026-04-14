'use client';

import { useState } from 'react';

type ApiAsset = {
	name: string;
	browser_download_url: string;
	download_count?: number;
};

type ApiRelease = {
	name?: string;
	tag_name?: string;
	prerelease?: boolean;
	body?: string;
	published_at?: string;
	created_at?: string;
	html_url?: string;
	assets?: ApiAsset[];
};

type ApiRepo = {
	name: string;
	stars?: number;
	releases?: ApiRelease[];
};

type ReleaseAsset = {
	name: string;
	url: string;
	downloads: number;
};

type ReleaseItem = {
	platform: string;
	repo: string;
	title: string;
	version: string;
	prerelease: boolean;
	body: string;
	date: string;
	url: string;
	stars: number;
	assets: ReleaseAsset[];
};

const PLATFORMS = [
	{ key: 'github', label: 'GitHub', color: '#58a6ff' },
	{ key: 'gitlab', label: 'GitLab', color: '#fc6d26' },
	{ key: 'gitea', label: 'Gitea', color: '#609926' },
	{ key: 'codeberg', label: 'Codeberg', color: '#2185d0' },
	{ key: 'forgejo', label: 'Forgejo', color: '#ff6f5e' },
	{ key: 'bitbucket', label: 'Bitbucket', color: '#4c9aff' },
];

function timeAgo(dateStr?: string) {
	if (!dateStr) return '';
	const d = new Date(dateStr);
	const now = new Date();
	const sec = Math.floor((now.getTime() - d.getTime()) / 1000);
	if (sec < 60) return 'just now';
	if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
	if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
	if (sec < 86400 * 30) return `${Math.floor(sec / 86400)}d ago`;
	if (sec < 86400 * 365) return `${Math.floor(sec / 86400 / 30)}mo ago`;
	return `${Math.floor(sec / 86400 / 365)}y ago`;
}

function getAssetIcon(name = '') {
	const n = name.toLowerCase();
	if (n.endsWith('.exe') || n.includes('win') || n.includes('windows')) return '🪟';
	if (
		n.endsWith('.dmg') ||
		n.endsWith('.pkg') ||
		n.includes('mac') ||
		n.includes('darwin')
	)
		return '🍎';
	if (n.endsWith('.apk') || n.includes('android')) return '🤖';
	if (
		n.endsWith('.deb') ||
		n.endsWith('.rpm') ||
		n.endsWith('.appimage') ||
		n.includes('linux')
	)
		return '🐧';
	if (n.endsWith('.tar.gz') || n.endsWith('.zip') || n.endsWith('.tar.xz')) {
		return '📦';
	}
	return '📄';
}

export default function SearchResults() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<ReleaseItem[]>([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [activePlatform, setActivePlatform] = useState('all');

	const filteredResults =
		activePlatform === 'all'
			? results
			: results.filter((item) => item.platform === activePlatform);

	const handleSearch = async (incomingQuery?: string) => {
		const q = (incomingQuery ?? query).trim();
		if (!q) return;

		setError('');
		setLoading(true);

		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data?.error || 'Request failed');
			}

			const mapped = (Array.isArray(data) ? data : [])
				.map((repo: ApiRepo): ReleaseItem | null => {
					const latest = repo.releases?.[0];
					if (!latest) return null;

					return {
						platform: 'github',
						repo: repo.name,
						title: latest.name || latest.tag_name || repo.name,
						version: latest.tag_name || 'unknown',
						prerelease: Boolean(latest.prerelease),
						body: latest.body || '',
						date: latest.published_at || latest.created_at || '',
						url: latest.html_url || '',
						stars: repo.stars || 0,
						assets: (latest.assets || []).map((asset: ApiAsset) => ({
							name: asset.name,
							url: asset.browser_download_url,
							downloads: asset.download_count || 0,
						})),
					};
				})
				.filter((item): item is ReleaseItem => item !== null)
				.sort(
					(a, b) =>
						new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
				);

			setResults(mapped);

			if (!mapped.length) {
				setError('No releases found. Try a different repository or keyword.');
			}
		} catch (e: unknown) {
			setResults([]);
			setError(e instanceof Error ? e.message : 'Error fetching results');
		} finally {
			setLoading(false);
		}
	};

	const examples = [
		'neovim/neovim',
		'yt-dlp/yt-dlp',
		'obsidianmd/obsidian-releases',
		'ventoy/ventoy',
		'mpv-player/mpv',
	];

	return (
		<div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f] text-[#e8e8f0]">
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-40"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
				}}
			/>
			<div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(0,229,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,160,0.03)_1px,transparent_1px)] bg-size-[48px_48px]" />
			<div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,229,160,0.06)_0%,transparent_60%)]" />

			<section className="relative z-10 px-6 pb-14 pt-20 text-center">
				<div className="mx-auto w-full max-w-275">
					<div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#00e5a0]">
						<span className="h-px w-7 bg-[#00e5a0]/50" />
						Universal Release Search
						<span className="h-px w-7 bg-[#00e5a0]/50" />
					</div>
					<h1 className="mb-5 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
						Find releases across
						<br />
						every <span className="text-[#00e5a0]">git platform</span>
					</h1>
					<p className="mx-auto mb-12 max-w-125 text-[1.05rem] leading-7 text-[#6b6b8a]">
						Search GitHub, GitLab, Gitea, Codeberg, Forgejo and more, all in one
						place.
					</p>

					<div className="mb-12 flex flex-wrap justify-center gap-2">
						{PLATFORMS.map((platform) => (
							<div
								key={platform.key}
								className="flex cursor-default items-center gap-1.5 rounded-md border border-[#1e1e2e] bg-[#111118] px-3 py-1.5 font-mono text-[11px] transition hover:-translate-y-px hover:border-[#2a2a3e]"
							>
								<span
									className="h-1.5 w-1.5 rounded-full"
									style={{ background: platform.color }}
								/>
								{platform.label}
							</div>
						))}
					</div>

					<div className="mx-auto w-full max-w-175">
						<div className="flex overflow-hidden rounded-xl border border-[#2a2a3e] bg-[#111118] focus-within:border-[#00e5a0] focus-within:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]">
							<div className="flex items-center px-4 text-xl text-[#6b6b8a]">⌕</div>
							<input
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										handleSearch();
									}
								}}
								placeholder="neovim, torvalds/linux, https://github.com/..."
								className="min-w-0 flex-1 bg-transparent py-4 font-mono text-sm text-[#e8e8f0] outline-none placeholder:text-[#6b6b8a]"
							/>
							<button
								onClick={() => handleSearch()}
								disabled={loading}
								className="inline-flex items-center gap-2 whitespace-nowrap bg-[#00e5a0] px-6 text-sm font-bold tracking-[0.03em] text-[#0a0a0f] transition hover:bg-[#00ffb3] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#2a2a3e] disabled:text-[#6b6b8a]"
							>
								{loading ? '...' : 'Search'}
							</button>
						</div>

						<div className="mt-3.5 flex flex-wrap justify-center gap-2">
							{['all', 'github', 'gitlab', 'gitea', 'codeberg', 'forgejo'].map((key) => (
								<button
									key={key}
									onClick={() => setActivePlatform(key)}
									className={`inline-flex items-center gap-1 rounded-[20px] border px-3.5 py-1.5 font-mono text-[11px] transition ${
										activePlatform === key
											? 'border-[#00e5a0] bg-[rgba(0,229,160,0.07)] text-[#00e5a0]'
											: 'border-[#1e1e2e] bg-[#111118] text-[#6b6b8a] hover:border-[#2a2a3e] hover:text-[#e8e8f0]'
									}`}
								>
									{key === 'all' ? 'All Platforms' : key}
								</button>
							))}
						</div>

						<div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-[#6b6b8a]">
							<span>Try:</span>
							{examples.map((example) => (
								<button
									key={example}
									onClick={() => {
										setQuery(example);
										handleSearch(example);
									}}
									className="rounded border border-dashed border-[#2a2a3e] px-2.5 py-1 font-mono text-[11px] transition hover:border-[#00e5a0] hover:text-[#00e5a0]"
								>
									{example}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="relative z-10 px-6 pb-20">
				<div className="mx-auto w-full max-w-275">
					{error && (
						<div className="mb-4 rounded-lg border border-[rgba(255,92,122,0.3)] bg-[rgba(255,92,122,0.1)] px-4 py-3 font-mono text-xs text-[#ff5c7a]">
							⚠ {error}
						</div>
					)}

					{loading && (
						<div>
							<div className="mb-6 h-0.5 w-full overflow-hidden rounded bg-[#1e1e2e]">
								<div className="h-full w-2/5 animate-[loading_1.5s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,#00e5a0,transparent)]" />
							</div>
							<div className="px-5 py-16 text-center">
								<div className="mb-3 text-5xl">🔍</div>
								<div className="mb-2 text-xl font-bold">Scanning platforms...</div>
								<div className="text-sm text-[#6b6b8a]">
									Querying GitHub for repositories and releases
								</div>
							</div>
						</div>
					)}

					{!loading && filteredResults.length > 0 && (
						<>
							<div className="mb-5 flex items-center justify-between border-b border-[#1e1e2e] pb-3.5">
								<div className="font-mono text-xs text-[#6b6b8a]">
									Found <span className="font-bold text-[#00e5a0]">{filteredResults.length}</span>{' '}
									releases
								</div>
							</div>

							<div className="flex flex-col gap-3">
								{filteredResults.map((item, index) => {
									const body = (item.body || '')
										.replace(/#{1,6} /g, '')
										.replace(/\*\*/g, '')
										.slice(0, 200);

									return (
										<div
											key={`${item.repo}-${item.version}-${index}`}
											onClick={() => {
												if (item.url) {
													window.open(item.url, '_blank', 'noopener,noreferrer');
												}
											}}
											className="group relative overflow-hidden rounded-xl border border-[#1e1e2e] bg-[#111118] px-6 py-5 transition hover:translate-x-0.75 hover:border-[#2a2a3e] hover:bg-[#16161f]"
											style={{ animation: `fadeUp 0.3s ease ${index * 0.04}s both` }}
										>
											<span className="pointer-events-none absolute inset-y-0 left-0 w-0.75 bg-[#58a6ff] opacity-0 transition group-hover:opacity-100" />

											<div className="mb-2.5 flex items-start justify-between gap-4">
												<div className="min-w-0 flex-1">
													<div className="mb-1.5 flex items-center gap-2">
														<span className="rounded bg-[rgba(88,166,255,0.15)] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.05em] text-[#58a6ff]">
															GitHub
														</span>
														<span className="truncate font-mono text-xs text-[#6b6b8a]">{item.repo}</span>
													</div>
													<h3 className="mb-1 truncate text-[1.1rem] font-bold">{item.title}</h3>
													{body && (
														<p className="line-clamp-2 text-[13px] leading-6 text-[#6b6b8a]">{body}</p>
													)}
												</div>

												<div className="flex shrink-0 flex-col items-end gap-2 max-sm:flex-row max-sm:items-center">
													<span className="rounded-md border border-[rgba(0,229,160,0.2)] bg-[rgba(0,229,160,0.08)] px-2.5 py-1 font-mono text-[13px] text-[#00e5a0]">
														{item.version}
													</span>
													{item.prerelease && (
														<span className="rounded border border-[rgba(247,162,106,0.2)] bg-[rgba(247,162,106,0.1)] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.05em] text-[#f7a26a]">
															PRE-RELEASE
														</span>
													)}
													<span className="font-mono text-[11px] text-[#6b6b8a]">{timeAgo(item.date)}</span>
												</div>
											</div>

											{!!item.assets?.length && (
												<div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#1e1e2e] pt-3">
													{item.assets.slice(0, 8).map((asset) => (
														<a
															key={asset.name}
															href={asset.url}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(event) => event.stopPropagation()}
															className="inline-flex max-w-55 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-[#2a2a3e] bg-[#16161f] px-2.5 py-1.5 font-mono text-[11px] text-[#6b6b8a] transition hover:border-[#00e5a0] hover:bg-[rgba(0,229,160,0.05)] hover:text-[#e8e8f0]"
														>
															<span>{getAssetIcon(asset.name)}</span>
															{asset.name}
															{asset.downloads > 0 ? ` · ↓${asset.downloads.toLocaleString()}` : ''}
														</a>
													))}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</>
					)}

					{!loading && filteredResults.length === 0 && !error && (
						<div className="px-5 py-20 text-center">
							<div className="mb-4 text-5xl">📡</div>
							<div className="mb-2 text-xl font-bold">Radar is ready</div>
							<div className="text-sm text-[#6b6b8a]">
								Search a project name or paste a repo URL to find its releases
							</div>
						</div>
					)}
				</div>
			</section>

			<footer className="relative z-10 border-t border-[#1e1e2e] px-6 py-8 text-center">
				<div className="mx-auto w-full max-w-275">
					<p className="font-mono text-[11px] leading-7 text-[#6b6b8a]">
						ReleaseRadar searches GitHub, GitLab, Gitea, Codeberg and more.
						<br />
						Uses public APIs, no tracking, no account needed.
					</p>
				</div>
			</footer>
		</div>
	);
}
