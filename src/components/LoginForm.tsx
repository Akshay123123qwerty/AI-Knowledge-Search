import React, { useState} from "react";
import axios from "axios";

interface RegisterType{
  onLogin: () => void ,
  onRegister : ()=>void
}

const LoginForm: React.FC< RegisterType> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
   

      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      onLogin();
    } catch (err: any) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #6a0dad, #b185f1)", 
      }}
    >
      <div className="flex flex-col items-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-extrabold tracking-wide text-center drop-shadow-md">
          Welcome, Lets start!
        </h1>

        <form
          onSubmit={handleSubmit}
         className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <span onClick={onRegister} className="text-blue-600 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
