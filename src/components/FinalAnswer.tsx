import React from "react";

interface FinalAnswerProps {
  answer: string;
}

const FinalAnswer: React.FC<FinalAnswerProps> = ({ answer }) => {
  if (!answer) {
    return <p className="text-gray-500">Answer is Generating....</p>;
  }
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
    </div>
  );
};

export default FinalAnswer;
