import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to={`/recipes/${idMeal}`} className="w-full md:w-[260px] transition-transform duration-200">
      <div className="bg-gradient shadow w-full rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <img
          src={image}
          alt={label}
          className="rounded-t-lg h-[200px] md:h-[180px] w-full object-cover"
        />

        <div className="p-3">
          <p className="text-white font-semibold truncate">{label}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500">
              {cuisineType || "Unknown Cuisine"}
            </span>
            <span className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500">
              {mealType || "Unknown Category"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
