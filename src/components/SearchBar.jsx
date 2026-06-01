import React from "react";
import { BiSearchAlt2 } from 'react-icons/bi';

const Searchbar = ({
  type,
  placeholder,
  required = false,
  value,
  name,
  handleInputChange,
  rightIcon,
  onClear,
}) => {
  return (
    <div className="relative w-full group">
      {/* Search icon on left */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <BiSearchAlt2 className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors" />
      </div>

      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="w-full py-3.5 pl-12 pr-16 text-gray-700 dark:text-gray-200 bg-white dark:bg-white/[0.04] rounded-full border border-gray-200 dark:border-white/[0.08] 
        outline-none focus:ring-2 focus:ring-emerald-500/30 dark:focus:ring-emerald-400/20 focus:border-emerald-300 dark:focus:border-emerald-500/30
        shadow-sm hover:shadow-md focus:shadow-md
        transition-all duration-300 
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        text-sm md:text-base"
      />
      
      {/* Clear button */}
      {value && (
        <button 
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-12 flex items-center pr-1 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      {/* Submit button */}
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button 
            type="submit" 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {rightIcon}
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbar;