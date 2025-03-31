import React, { useState } from "react";
import axios from "axios";
import WelcomePage from "./components/WelcomePage";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import FinalAnswer from "./components/FinalAnswer";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source?: string;
}

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search/", {
        params: { query: searchQuery },
      });
     
      setResults(response.data.retrieved_documents);
      setAnswer(response.data.answer);
    } catch (err: any) {
      setError("Error fetching results.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {started ? (
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Search Interface</h2>
          <SearchBar onSearch={handleSearch} />
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Search Results</h3>
              <SearchResults results={results} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Final Answer</h3>
             <FinalAnswer answer={answer}/>
            </div>
          </div>
        </div>
      ) : (
        <WelcomePage onStart={handleStart} />
      )}
    </div>
  );
};

export default App;
