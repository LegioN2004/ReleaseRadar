export async function GET(req) {
	const { searchParams } = new URL(req.url); // urlor pra uthabo and
	const q = searchParams.get('q'); // search term tu q r pra lobo

	if (!q) {
		return Response.json({ error: 'No query provided' }, { status: 400 });
	}

	try {
		const searchResults = await fetch(
			`https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`,
		);

		if (!searchResults.ok) {
			return Response.json(
				{ error: 'GitHub search request failed' },
				{ status: searchResults.status },
			);
		}

		const searchData = await searchResults.json();
		const topRepos = Array.isArray(searchData.items)
			? searchData.items.slice(0, 5)
			: [];

		const results = []; // results object

		for (const repo of topRepos) {
			const releaseResults = await fetch(
				`https://api.github.com/repos/${repo.owner.login}/${repo.name}/releases`,
			);

			if (!releaseResults.ok) {
				continue;
			}

			const releasesData = await releaseResults.json();

			if (Array.isArray(releasesData) && releasesData.length > 0) {
				results.push({
					name: repo.full_name,
					stars: repo.stargazers_count,
					releases: releasesData.slice(0, 1), // only latest releases
				});
			}
		}

		return Response.json(results);
	} catch (error) {
		return Response.json(
			{ error: 'Error fetching data from GitHub API' },
			{ status: 500 },
		);
	}
}
