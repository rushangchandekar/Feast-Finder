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

  if (loading && recipes.length === 0) return <Loading />;

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Enhanced heading */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-px w-8 bg-green-500 mr-3"></span>
            <span className="text-green-600 font-medium uppercase tracking-wider text-sm">Delicious Options</span>
            <span className="h-px w-8 bg-green-500 ml-3"></span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Find Your Perfect Recipe
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover dishes made from ingredients you already have at home
          </p>
        </div>
          
        {/* Search form */}
        <form className="w-full max-w-xl mx-auto mb-10" onSubmit={handleSearchedRecipe}>
          <Searchbar
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-600 cursor-pointer hover:text-green-600 transition-colors"
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
                  <div className="w-[280px] h-[300px]">
                    <RecipeCard recipe={item} />
                  </div>
                </div>
              ))}
            </div>

            {/* Show More button or Loading component */}
            <div className="flex w-full items-center justify-center mt-12">
              {loadingMore ? (
                <Loading />
              ) : (
                <Button
                  title="Show More Recipes"
                  containerStyle="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  handleClick={showMore}
                  rightIcon={<FaArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />}
                />
              )}
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
              <p className="text-gray-600 text-lg">No recipes found matching your search.</p>
              <p className="text-gray-500 mt-2">Try a different keyword or ingredient.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recipes;