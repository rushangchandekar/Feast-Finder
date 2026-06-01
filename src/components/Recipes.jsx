import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaArrowDown } from 'react-icons/fa';
import Loading from './Loading';
import Searchbar from './SearchBar';
import RecipeCard from './RecipeCard';
import { fetchRecipes } from "../lib";
import Button from './Button';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery === '') {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    localStorage.removeItem('cachedQuery');
    localStorage.removeItem('cachedRecipes');
    fetchRecipe({ searchQuery: '', resultLimit: limit });
  };

  const fetchRecipe = async ({ searchQuery = query, resultLimit = 10, shouldAppend = false }) => {
    try {
      if (shouldAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const data = await fetchRecipes({ query: searchQuery, limit: resultLimit });
      
      setRecipes(prev =>
        shouldAppend ? [...prev, ...data.filter(item => !prev.find(p => p.idMeal === item.idMeal))] : data
      );

      if (searchQuery) {
        localStorage.setItem('cachedQuery', searchQuery);
        localStorage.setItem('cachedRecipes', JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearchedRecipe = async (e) => {
    e.preventDefault();
    setLimit(10);
    fetchRecipe({ searchQuery: query, resultLimit: 10 });
  };

  const showMore = async () => {
    const newLimit = limit + 10;
    setLimit(newLimit);

    await fetchRecipe({
      searchQuery: query,
      resultLimit: newLimit,
      shouldAppend: true,
    });
  };

  useEffect(() => {
    fetchRecipe({ searchQuery: '', resultLimit: limit });
    
    const cachedQuery = localStorage.getItem('cachedQuery');
    if (cachedQuery) {
      setQuery(cachedQuery);
    }
  }, []);

  if (loading && recipes.length === 0) return (
    <div className="py-20 flex justify-center">
      <Loading />
    </div>
  );

  return (
    <section className="w-full py-16 md:py-24">
      <div className="w-full">
        {/* Section heading */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500 dark:to-emerald-400" />
            <span className="mx-3 text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-widest text-sm">Delicious Options</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500 dark:to-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Find Your Perfect <span className="gradient-text">Recipe</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Discover dishes made from ingredients you already have at home
          </p>
        </div>
          
        {/* Search form */}
        <form className="w-full max-w-xl mx-auto mb-12" onSubmit={handleSearchedRecipe}>
          <Searchbar
            placeholder="Search recipes... e.g. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                onClick={handleSearchedRecipe}
                size={22}
              />
            }
            value={query}
            onClear={clearSearch}
          />
        </form>

        {/* Recipe cards */}
        {recipes?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-full max-w-[320px]">
                    <RecipeCard recipe={item} />
                  </div>
                </div>
              ))}
            </div>

            {/* Show More button */}
            <div className="flex w-full items-center justify-center mt-14">
              {loadingMore ? (
                <Loading />
              ) : (
                <button
                  onClick={showMore}
                  className="group inline-flex items-center gap-3 px-7 py-3 bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-full hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <span>Show More Recipes</span>
                  <FaArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform duration-300" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-100 dark:border-white/[0.06] p-10 max-w-md text-center shadow-sm">
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">No recipes found matching your search.</p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">Try a different keyword or ingredient.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recipes;