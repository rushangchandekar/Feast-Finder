import React from "react";

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
    <div className="relative w-full">
      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="w-full p-3 px-5 text-gray-700 bg-white rounded-full border border-gray-200 
        outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
        shadow-md transition-all duration-200 placeholder:text-gray-400"
      />
      
      {value && (
        <button 
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-12 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
      
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <button type="submit" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            {rightIcon}
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbar;