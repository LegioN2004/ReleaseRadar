"use client";

import { useState } from "react";
import { BsFiletypeExe } from "react-icons/bs";
import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";

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

function timeAgo(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const sec = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 86400 * 30) return `${Math.floor(sec / 86400)}d ago`;
  if (sec < 86400 * 365) return `${Math.floor(sec / 86400 / 30)}mo ago`;
  return `${Math.floor(sec / 86400 / 365)}y ago`;
}

function getAssetIcon(name = "") {
  const n = name.toLowerCase();
  if (
    n.endsWith(".exe") ||
    n.endsWith(".msi") ||
    n.includes("win") ||
    n.includes("windows")
  )
    return <FaWindows />;
  if (
    n.endsWith(".dmg") ||
    n.endsWith(".pkg") ||
    n.includes("mac") ||
    n.includes("darwin")
  )
    return <FaApple />;
  if (n.endsWith(".apk") || n.includes("android")) return <FaAndroid />;
  if (
    n.endsWith(".deb") ||
    n.endsWith(".rpm") ||
    n.endsWith(".appimage") ||
    n.endsWith(".tar.gz") ||
    n.endsWith(".tar.xz") ||
    n.includes("linux")
  )
    return <FaLinux />;
  if (n.endsWith(".zip")) {
    return <FaFileZipper />;
  }
  return <BsFiletypeExe />;
}

export default function SearchResults({ results, loading, error, activePlatform }) {

  const filteredResults =
    activePlatform === "all"
      ? results
      : results.filter((item) => item.platform === activePlatform);

  return (
    <>
      <section className="relative z-10 px-6 pb-15">
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
                <div className="mb-2 text-xl font-bold">
                  Scanning platforms...
                </div>
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
                  Found{" "}
                  <span className="font-bold text-[#00e5a0]">
                    {filteredResults.length}
                  </span>{" "}
                  releases
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {filteredResults.map((item, index) => {
                  const body = (item.body || "")
                    .replace(/#{1,6} /g, "")
                    .replace(/\*\*/g, "")
                    .slice(0, 200);

                  return (
                    <div
                      key={`${item.repo}-${item.version}-${index}`}
                      onClick={() => {
                        if (item.url) {
                          window.open(
                            item.url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }
                      }}
                      className="group relative overflow-hidden rounded-xl border border-[#1e1e2e] bg-[#111118] px-6 py-5 transition hover:translate-x-0.75 hover:border-[#2a2a3e] hover:bg-[#16161f]"
                      style={{
                        animation: `fadeUp 0.3s ease ${index * 0.04}s both`,
                      }}
                    >
                      <span className="pointer-events-none absolute inset-y-0 left-0 w-0.75 bg-[#58a6ff] opacity-0 transition group-hover:opacity-100" />

                      <div className="mb-2.5 flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex items-center gap-2">
                            <span className="rounded bg-[rgba(88,166,255,0.15)] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.05em] text-[#58a6ff]">
                              GitHub
                            </span>
                            <span className="truncate font-mono text-xs text-[#6b6b8a]">
                              {item.repo}
                            </span>
                          </div>
                          <h3 className="mb-1 truncate text-[1.1rem] font-bold">
                            {item.title}
                          </h3>
                          {body && (
                            <p className="line-clamp-2 text-[13px] leading-6 text-[#6b6b8a]">
                              {body}
                            </p>
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
                          <span className="font-mono text-[11px] text-[#6b6b8a]">
                            {timeAgo(item.date)}
                          </span>
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
                              {asset.downloads > 0
                                ? ` · ↓${asset.downloads.toLocaleString()}`
                                : ""}
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
        </div>
      </section>
      {!loading && filteredResults.length === 0 && !error && (
        <div className="px-5 py-15 text-center">
          <div className="mb-4 text-5xl">📡</div>
          <div className="mb-2 text-xl font-bold">Radar is ready</div>
          <div className="text-sm text-[#6b6b8a]">
            Search a project name or paste a repo URL to find its releases
          </div>
        </div>
      )}
    </>
  );
}
