
import React from "react";

interface SearchResult {
    id: string;
    title: string;
    content: string;
    source?: string;
  }
  interface SearchResultsProps {
    results: SearchResult[];
  }
  
  const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (!results || results.length === 0) {
      return <p className="text-gray-500">Results are Generating....</p>;
    }
    return (
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <p className="mt-2 text-gray-700">{result.content}</p>
            {result.source && (
              <p className="mt-1 text-sm text-gray-500">Source: {result.source}</p>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default SearchResults;
  