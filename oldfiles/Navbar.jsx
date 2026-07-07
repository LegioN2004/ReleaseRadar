export default function Navbar() {
	return (
		<nav className="sticky top-0 z-20 border-b border-[#1e1e2e] bg-[#0a0a0f]/85 backdrop-blur-xl">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
				<a
					href="#"
					className="flex items-center gap-2.5 text-base font-bold text-[#e8e8f0] font-mono"
				>
					<span className="h-2 w-2 animate-pulse rounded-full bg-[#00e5a0] shadow-[0_0_8px_#00e5a0]" />
					ReleasesRadar
				</a>

				<div className="hidden items-center gap-2 md:flex">
					<span className="rounded border border-[#2a2a3e] bg-[#16161f] px-2 py-0.5 text-[10px] text-[#6b6b8a] font-mono">
						GitHub
					</span>
					<span className="rounded border border-[#2a2a3e] bg-[#16161f] px-2 py-0.5 text-[10px] text-[#6b6b8a] font-mono">
						GitLab
					</span>
					<span className="rounded border border-[#2a2a3e] bg-[#16161f] px-2 py-0.5 text-[10px] text-[#6b6b8a] font-mono">
						Gitea
					</span>
					<span className="rounded border border-[#2a2a3e] bg-[#16161f] px-2 py-0.5 text-[10px] text-[#6b6b8a] font-mono">
						Codeberg
					</span>
					<span className="rounded border border-[#2a2a3e] bg-[#16161f] px-2 py-0.5 text-[10px] text-[#6b6b8a] font-mono">
						Forgejo
					</span>
				</div>
			</div>
		</nav>
	);
}
