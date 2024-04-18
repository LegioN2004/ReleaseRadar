import { getFunction, getFunction2 } from "./Requests.js";
import { useState, useEffect } from "react";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [repo_results, setRepo_results] = useState();

  function useDebounce(value, timeout) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    // const handleSearch = value => {
    // if (value.length > 3) {
    // fetchLocations({cityName: value})
    //   .then(data => {
    //     setLocations(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // }
    // };

    useEffect(() => {
      let hello = setTimeout(
        () => {
          setDebouncedValue(value);
          setRepo_results(getFunction2(value));
        },
        timeout,
        value
      );
      return () => {
        clearTimeout(hello);
      };
    }, [value]);
  }
  const debouncedValue = useDebounce(searchTerm, 500); // 500 milliseconds debounce delay

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    // console.log(getFunction2(searchTerm));
    // setRepo_search(getFunction2(searchTerm));
    // console.log(repo_search);
    // console.log(getFunction2(searchTerm));
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
          {repo_results}
          {repo_results.map((e) => {
            // <Component key={e.id} full_name={e.full_name}></Component>;
            const results = e.items;
            return <div>{results}</div>;
          })}
        </div>
      </div>
    </>
  );

  function Component({ full_name }) {
    return (
      <>
        <h3>{full_name}</h3>
        <br />
      </>
    );
  }
}
