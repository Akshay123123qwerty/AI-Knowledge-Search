import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

 

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center space-x-4 p-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query..."
        className="border border-purple-300 focus:ring-2 focus:ring-purple-500 p-2 rounded-xl w-full max-w-md shadow text-white"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition" 
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
