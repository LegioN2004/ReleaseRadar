"use client";
import { useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePlatform, setActivePlatform] = useState("github");
  const [results, setResults] = useState([]);

  const handleSearch = async (incomingQuery: []) => {
    const q = (incomingQuery ?? query).trim();
    if (!q) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      const mapped = (Array.isArray(data) ? data : [])
        .map((repo) => {
          const latest = repo.releases?.[0];
          if (!latest) return null;

          return {
            platform: "github",
            repo: repo.name,
            title: latest.name || latest.tag_name || repo.name,
            version: latest.tag_name || "unknown",
            prerelease: Boolean(latest.prerelease),
            body: latest.body || "",
            date: latest.published_at || latest.created_at,
            url: latest.html_url,
            stars: repo.stars || 0,
            assets: (latest.assets || []).map((asset) => ({
              name: asset.name,
              url: asset.browser_download_url,
              downloads: asset.download_count || 0,
            })),
          };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

      setResults(mapped);

      if (!mapped.length) {
        setError("No releases found. Try a different repository or keyword.");
      }
    } catch (e) {
      setResults([]);
      setError(e.message || "Error fetching results");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "neovim/neovim",
    "yt-dlp/yt-dlp",
    "obsidianmd/obsidian-releases",
    "ventoy/ventoy",
    "mpv-player/mpv",
  ];

  return (
    <>
      <div>
        <div className="mx-auto w-full max-w-175">
          <div className="flex overflow-hidden rounded-xl border border-[#2a2a3e] bg-[#111118] focus-within:border-[#00e5a0] focus-within:shadow-[0_0_0_3px_rgba(0,229,160,0.1)]">
            <div className="flex items-center px-4 text-xl text-[#6b6b8a]">
              ⌕
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
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
              {loading ? "..." : "Search"}
            </button>
          </div>

          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {["all", "github", "gitlab", "gitea", "codeberg", "forgejo"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => setActivePlatform(key)}
                  className={`inline-flex items-center gap-1 rounded-[20px] border px-3.5 py-1.5 font-mono text-[11px] transition ${
                    activePlatform === key
                      ? "border-[#00e5a0] bg-[rgba(0,229,160,0.07)] text-[#00e5a0]"
                      : "border-[#1e1e2e] bg-[#111118] text-[#6b6b8a] hover:border-[#2a2a3e] hover:text-[#e8e8f0]"
                  }`}
                >
                  {key === "all" ? "All Platforms" : key}
                </button>
              ),
            )}
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
        <section className="relative z-10 px-6 pb-20">
          <SearchResults results={results} loading={loading} error={error} activePlatform={activePlatform} />
        </section>
      </div>
    </>
  );
}
