import React from "react";

interface WelcomePageProps {
  onStart: () => void;
}

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = "", children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to AI Knowledge Search
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Your intelligent search assistant powered by AI.
      </p>
      <Button onClick={onStart} className="px-6 py-2 text-lg">
        Get Started
      </Button>
    </div>
  );
};

export default WelcomePage;
