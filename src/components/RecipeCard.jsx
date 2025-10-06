import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaUtensils } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  const {
    idMeal,
    strMealThumb: image,
    strMeal: label,
    strArea: cuisineType,
    strCategory: mealType
  } = recipe;

  return (
    <Link to={`/recipes/${idMeal}`} className="block w-full h-full group">
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative">
          {/* Fixed height image container */}
          <div className="h-[180px] w-full overflow-hidden">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
            {label}
          </h3>
          <div className="w-10 h-0.5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mt-2 mb-3 group-hover:w-full transition-all duration-300"></div>
          
          {/* Labels moved below the title */}
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-2 py-1 text-[11px] font-medium capitalize rounded-full flex items-center bg-green-50 text-green-700 border border-green-100">
              <FaGlobe className="mr-1 text-green-600" size={10} />
              {cuisineType || "Unknown"}
            </span>
            <span className="px-2 py-1 text-[11px] font-medium capitalize rounded-full flex items-center bg-amber-50 text-amber-700 border border-amber-100">
              <FaUtensils className="mr-1 text-amber-600" size={10} />
              {mealType || "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;