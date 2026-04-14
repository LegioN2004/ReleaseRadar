import axios from "axios";
// import { JSONHeroSearch } from "@jsonhero/fuzzy-json-search";

// const user_name = "jgm";
// const repo_name = "pandoc";

export const getFunction2 = async (repo_name) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${repo_name}`,
    );
    return response.data;
    // const assets = response.data.items;
    // const iteration = assets.map((element) => {
    //   element.full_name;
    // });
    // console.log(iteration);
    // if (element.full_name === `${user_name}/${repo_name}`) {
    //   const mainInput = `${user_name}/${repo_name}`;
    // }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getFunction = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${user_name}/${repo_name}/releases/latest`,
    );
    const assets = response.data.assets;
    const iteration = assets.map((e) => e.name);
    // const searcher = new JSONHeroSearch(iteration);
    // const results_deb = searcher.search("pandoc");
    const results_deb2 = searcher.search(`${repo_name}windows`);
    // ----------------------
    // console.log(results_deb, results_deb2);
    console.log(results_deb2);
    console.log("--------------------------------------------------");
  } catch (error) {
    console.error("Error: ", error);
  }
};

// getFunction2();
// getFunction();
