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
      <div className="bg-white dark:bg-white/[0.03] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06] hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-500 h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10 hover:-translate-y-1">
        <div className="relative">
          {/* Image container */}
          <div className="h-[200px] w-full overflow-hidden">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>

          {/* Cuisine badge (floating on image) */}
          {cuisineType && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/90 dark:bg-black/60 dark:backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/20 flex items-center gap-1.5 shadow-sm">
                <FaGlobe className="text-emerald-500" size={9} />
                {cuisineType}
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2 mb-2">
            {label}
          </h3>
          
          {/* Accent line */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mb-3 group-hover:w-full transition-all duration-500" />
          
          {/* Category tag */}
          {mealType && (
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium capitalize rounded-full bg-gray-50 dark:bg-white/[0.05] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/[0.06]">
                <FaUtensils className="text-amber-500" size={9} />
                {mealType}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;