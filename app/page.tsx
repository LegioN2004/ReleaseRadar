import Navbar from "@/components/Navbar.tsx";
import SearchResults from "@/components/SearchResults";

export default function Home() {
  return (
    <div className="bg-[#0a0a0f] font-sans">
      <main>
        <Navbar />
        <SearchResults />
      </main>
    </div>
  );
}
