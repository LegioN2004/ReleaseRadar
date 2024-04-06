export function SearchBar() {
	return (
		<>
			<div className="flex justify-center pt-8">
				<input
					placeholder="Search"
					className="border-2 border-black bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
					type="search"
					name="search"
				/>
			</div>
		</>
	);
}
