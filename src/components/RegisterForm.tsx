import React, { useState } from "react";
import axios from "axios";

interface RegisterFormProps {
  onRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });
      setMessage("Registration successful! Please log in.");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        onRegister();
      }, 1500);
    } catch (err: any) {
      setMessage("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Register
        </h2>
        {message && <p className="text-center mb-4 text-gray-700">{message}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded px-4 py-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded"
        >
          Register
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={onRegister}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
