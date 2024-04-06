export function Navbar() {
	return (
		<>
			<div className="flex justify-between">
				<div className="pt-3 pl-4">
					<a href="#" className="text-black text-2xl font-bold">
						OctoCat_Search
					</a>
				</div>
				<div className="flex font-semibold justify-end pr-4 pt-3">
					<a href="#" className="text-black pr-5 hover:text-blue-400">
						Home
					</a>
					<a href="#" className="text-black hover:text-blue-400 pr-2">
						About
					</a>
				</div>
			</div>
		</>
	);
}
