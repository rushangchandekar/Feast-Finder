import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-10 h-10 rounded-full border-2 border-emerald-200 dark:border-emerald-500/20" />
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-transparent border-t-emerald-500 dark:border-t-emerald-400 animate-spin" />
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;