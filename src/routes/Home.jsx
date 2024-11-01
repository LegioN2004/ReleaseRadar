import { Navbar } from '../components/Navbar';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';

export function Home() {
	return (
		<>
			<div>
				<Navbar></Navbar>
				<SearchBar></SearchBar>
				{/*<SearchResults></SearchResults>*/}
			</div>
		</>
	);
}
