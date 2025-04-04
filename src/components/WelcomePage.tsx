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
      className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #6a0dad, #b185f1)",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-4 text-center drop-shadow-md">
        Welcome to AI Knowledge Search
      </h1>
      <p className="text-lg text-white mb-6 text-center">
        Your intelligent search assistant powered by AI.
      </p>
      <Button onClick={onStart} className="px-6 py-2 text-lg">
        Get Started
      </Button>
    </div>
  );
};

export default WelcomePage;
