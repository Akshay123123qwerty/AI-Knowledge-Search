import React, { useState } from "react";
import axios from "axios";
import WelcomePage from "./components/WelcomePage";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import FinalAnswer from "./components/FinalAnswer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source?: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [started, setStarted] = useState(false);
  const [, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const[,setClicked] = useState<boolean>(false);
  const[showRegister,setShowRegister] = useState<boolean>(false);

  const handleStart = () => setStarted(true);
  const handleLogin = () => setIsLoggedIn(true);
  const handleRegister = () => setShowRegister(true);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    setStarted(false);
  }

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    setClicked(true)
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

  if (!isLoggedIn) {
    return showRegister ? (
    <RegisterForm onRegister = {()=>setShowRegister(false)}/>
    ):(
    <LoginForm onLogin={handleLogin} onRegister={handleRegister} />)
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #6a0dad, #b185f1)",
      }}
    >
      {started ? (
        <div className="container mx-auto p-6">
          <h2 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow">
            Search Query!
          </h2>
          <SearchBar onSearch={handleSearch} />
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Search Results</h3>
              <SearchResults results={results} loading={loading} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Final Answer</h3>
              <FinalAnswer answer={answer} loading={loading} />
            </div>
          </div>
        </div>
      ) : (
        <WelcomePage onStart={handleStart} />
      )}
      {isLoggedIn && started && (
        <div className="text-right mb-4">
        <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
                Logout
        </button>

      </div>
      )}
    </div>
  );
};

export default App;
