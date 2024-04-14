import { getFunction } from "./Requests.js";
import { Link } from "react-router-dom";

// <div className="flex justify-center pt-8">{getFunction}</div>
export function SearchResults() {
  return (
    <>
      <div className=" bg-gray-400 justify-end m-4 p-4 rounded-md">
        <div>user_name/repo_name(main repo and downloads container div)</div>
        <div className="grid grid-cols-12">
          <Link to="https://microsoft.com">
            <div className="border-black p-2 m-1 border-2 col-span-2 hover:cursor-pointer">
              windows x86_64 msi
            </div>
          </Link>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            windows x86_64 zip{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            macos x86_64 pkg{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            macos x86_64 zip{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            macos arm64 pkg{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            macos arm64 zip{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            linux amd64 tar.gz{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            linux arm64 tar.gz{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            ubuntu amd64 deb{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            ubuntu arm64 deb{" "}
          </div>
          <div className="border-black p-2 m-1 border-2 col-span-2">
            {" "}
            linux intel86 tar.gz{" "}
          </div>
        </div>
      </div>
    </>
  );
}
