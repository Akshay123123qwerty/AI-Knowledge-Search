import React from "react";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  loading:boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {

  if (loading) {
    return <p className="text-white-500">Generating...</p>;
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl shadow hover:shadow-lg transition"
        >
          <p className="text-gray-800 font-medium">{result.content}</p>
          {result.source && (
            <p className="mt-1 text-sm text-purple-700">Source: {result.source}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
