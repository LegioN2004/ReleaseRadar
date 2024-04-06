const axios = require('axios');

const user_name = 'jgm';
const repo_name = 'pandoc';

const getFunction = async () => {
	try {
		const response = await axios.get(
			`https://api.github.com/repos/${user_name}/${repo_name}/releases/latest`
		);
		const assets = response.data.assets;
		console.log(assets[1].browser_download_url);
	} catch (error) {
		console.error('Error: ', error);
	}
};

getFunction();

export default getFunction;
