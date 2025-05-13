import { ReactNode, useState } from "react";

interface StepCardProps {
  number: number;
  title: string;
  content: ReactNode;
}

export default function StepCard({ number, title, content }: StepCardProps) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={`step-card bg-white p-6 rounded-lg shadow-md mb-6 cursor-pointer ${isActive ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex items-center mb-4">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4 ml-11">
        {content}
      </div>
    </div>
  );
}
