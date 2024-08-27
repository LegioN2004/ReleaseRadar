import axios from 'axios';
import { useEffect, useState } from 'react';
// import { getFunction, getFunction2 } from './Requests.js';

export function SearchBar() {
	const [searchTerm, setSearchTerm] = useState('pandoc');
	const [repoResults, setrepoResults] = useState([]);

	function useDebounce(value, timeout) {
		const [debouncedValue, setDebouncedValue] = useState(value);

		useEffect(() => {
			let hello = setTimeout(
				() => {
					setDebouncedValue(value);
					//setrepoResults(getFunction2(value));
					async function getFunction2(repo_name) {
						try {
							const response = await axios.get(
								`https://api.github.com/search/repositories?q=${repo_name}`
							);
							const assets = response.data.items;
							setrepoResults(assets);
						} catch (error) {
							console.error('Error: ', error);
						}
					}
					getFunction2(value);
				},
				timeout,
				value
			);
			return () => {
				clearTimeout(hello);
			};
		}, [value]);
	}
	const debouncedValue = useDebounce(searchTerm, 700); // 500 milliseconds debounce delay

	const handleInput = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	return (
		<>
			<div className="flex justify-center pt-8">
				<input
					placeholder="Search repo name"
					className="border-2 border-black bg-white h-10 p-5 rounded-lg text-sm focus:outline-none"
					type="search"
					name="search"
					value={searchTerm}
					onChange={handleInput}
				/>
			</div>
			<div className="pl-5 pr-5 bg-cyan-500">
				<div>
					{repoResults.map((results) => {
						<Results results={results} />;
					})}
				</div>
			</div>
		</>
	);

	function Results({ results }) {
		return (
			<div>
				{results.full_name}
				<br />
				{results.html_url}
			</div>
		);
	}
}
