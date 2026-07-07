'use client';

import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import { useState } from "react";

type ApiAsset = {
	name: string;
	browser_download_url: string;
	download_count?: number;
};

type ApiRelease = {
	name?: string;
	tag_name?: string;
	prerelease?: boolean;
	body?: string;
	published_at?: string;
	created_at?: string;
	html_url?: string;
	assets?: ApiAsset[];
};

type ApiRepo = {
  name: string;
  stars?: number;
  releases: ApiRelease[];
}

export default function Home() {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async(incomingQuery?: string) => {
    const q = (incomingQuery ?? "").trim();
    if (!q) return;

    setError("");
    setLoading(true);

    try {

      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await response.json();

      if(!response.ok)
        throw new Error(data?.error || 'Request failed');

      const dataMap = (Array.isArray(data) ? data : []).map((repo: ApiRepo) => {
        const latest = repo.releases?.[0]
        if(!latest) return null;

        return {
          platform: "github",
          repo: repo.name,
          title: latest.name || latest.tag_name || repo.name,
          version: latest.tag_name || 'unknown',
          prerelease: Boolean(latest.prerelease),
        }
      })

    } catch (error) {
      setResults("");
      console.error("error");
      setError(error instanceof Error ? error.message : "Error fetching results");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className = "bg-[#0a0a0f] font-sans" >
      <main>
        <Navbar />
        <LandingPage results={results} loading={loading} error={error} handleSearch={handleSearch} />
      </main>
    </div>
  );
}
