"use client";

import SearchBar from "./SearchBar";
import { FaBitbucket, FaGithub, FaGitlab } from "react-icons/fa";
import { SiCodeberg, SiForgejo, SiGitea } from "react-icons/si";

const PLATFORMS = [
  { key: "github", label: "GitHub", color: "#58a6ff", icon: <FaGithub /> },
  { key: "gitlab", label: "GitLab", color: "#fc6d26", icon: <FaGitlab /> },
  { key: "gitea", label: "Gitea", color: "#609926", icon: <SiGitea /> },
  {
    key: "codeberg",
    label: "Codeberg",
    color: "#2185d0",
    icon: <SiCodeberg />,
  },
  { key: "forgejo", label: "Forgejo", color: "#ff6f5e", icon: <SiForgejo /> },
  {
    key: "bitbucket",
    label: "Bitbucket",
    color: "#4c9aff",
    icon: <FaBitbucket />,
  },
];

export default function LandingPage({}) {
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
          <p className="mx-auto mb-6 max-w-125 text-[1.05rem] leading-7 text-[#6b6b8a]">
            Search GitHub, GitLab, Gitea, Codeberg, Forgejo and more, all in one
            place.
          </p>

          <div className="mb-0 flex flex-wrap justify-center gap-2">
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
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20">
        <SearchBar />
      </section>

      <footer className="relative z-10 border-t border-[#1e1e2e] px-6 py-8 text-center">
        <div className="mx-auto w-full max-w-275">
          <p className="font-mono text-[11px] leading-7 text-[#6b6b8a]">
            ReleasesRadar searches GitHub, GitLab, Gitea, Codeberg and more.
            <br />
            Uses public APIs, no tracking, no account needed.
          </p>
        </div>
      </footer>
    </div>
  );
}
