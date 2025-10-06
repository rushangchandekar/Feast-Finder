import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 animate-bounce"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.8s" 
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loading;