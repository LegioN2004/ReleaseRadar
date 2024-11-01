import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [repo_results, setRepo_results] = useState([]);
  // const [repo_releases, setRepo_releases] = useState(repo_results.map(i => i.full_name));

  function useDebounce(value, timeout) { // searchTerm, 700
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      let hello = setTimeout(
        () => {
          setDebouncedValue(value);
          // search the repo first
          async function SearchRepo(repo_name) {
            try {
              const response = await axios.get(
                `https://api.github.com/search/repositories?q=${repo_name}`,
              );
              setRepo_results(response.data);
              console.log(response.data)
            } catch (error) {
              return error;
            }
          }
          SearchRepo(value);

          // then search for the releases
          async function SelectRepo(repo_results) {
            try {
              const response = await axios.get(`https://api.github.com/repos/${repo_results}/releases`);
              // setRepo_releases(response.data[0].assets)
              console.log(response);
            } catch (error) {
              return error;
            }
          }
          SelectRepo("jgm/pandoc");
        },
        timeout,
        value
      );
      return () => {
        clearTimeout(hello);
      };
    }, [value]);
  }
  const debouncedValue = useDebounce(searchTerm, 700); // 700 milliseconds debounce delay

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <div className="flex items-center justify-center w-full p-4">
        <div className="relative">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search repo name ..."
            type="search"
            name="search"
            // value={searchTerm}
            onChange={handleChange}
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <FaSearch className="w-4 h-4 mr-2"></FaSearch>
            Search
          </button>
        </div>
      </div>
      <div className="pl-5 pr-5 bg-cyan-500">
        <div>
          {searchTerm}
          {/*{repo_results.map(i => {*/}
          {/*  return (*/}
          {/*    <>*/}
          {/*      <div key={i.id} className="w-full h-full p-2">*/}
          {/*        <h1 className="p-2">repo name: {i.name}</h1>*/}
          {/*        <h2 className="p-2">full name: {i.full_name}</h2>*/}
          {/*        <div className="p-2">*/}
          {/*          {repo_releases.map(e => {*/}
          {/*            return <>*/}
          {/*              <div className="p-2" key={e.id}>*/}
          {/*                {e.name}*/}
          {/*              </div>*/}
          {/*            </>*/}
          {/*          })}*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  )*/}
          {/*})}*/}
        </div>
      </div>
    </>
  );
}
