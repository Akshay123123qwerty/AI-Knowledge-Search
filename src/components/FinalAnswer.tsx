import React from "react";

interface FinalAnswerProps {
  answer: string;
  loading:boolean,
}

const FinalAnswer: React.FC<FinalAnswerProps> = ({ answer,loading }) => {
  if (loading) {
    return <p className="text-white-500">Generating...</p>;
  }
  if (!answer) {
    return null;
  }
  return (
    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
      <p className="text-gray-800 whitespace-pre-wrap font-medium">{answer}</p>
    </div>
  );
};

export default FinalAnswer;
