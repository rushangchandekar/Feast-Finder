import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
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

  const handleChange = (e) => setQuery(e.target.value);

  const fetchRecipe = async ({ searchQuery = query, resultLimit = 10, shouldAppend = false }) => {
    try {
      setLoading(true);

      const data = await fetchRecipes({ query: searchQuery, limit: resultLimit });

      setRecipes(prev =>
        shouldAppend ? [...prev, ...data.filter(item => !prev.find(p => p.idMeal === item.idMeal))] : data
      );

      localStorage.setItem('cachedQuery', searchQuery);
      localStorage.setItem('cachedRecipes', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchedRecipe = async (e) => {
    e.preventDefault();
    setLimit(10); // reset limit
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
    const cachedQuery = localStorage.getItem('cachedQuery');
    const cachedRecipes = localStorage.getItem('cachedRecipes');

    if (cachedQuery && cachedRecipes) {
      setQuery(cachedQuery);
      setRecipes(JSON.parse(cachedRecipes));
    } else {
      fetchRecipe({ searchQuery: '', resultLimit: limit });
    }
  }, []);

  if (loading && recipes.length === 0) return <Loading />;

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-full lg:w-2/4" onSubmit={handleSearchedRecipe}>
          <Searchbar
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-600 cursor-pointer"
                onClick={handleSearchedRecipe}
              />
            }
            value={query}
          />
        </form>
      </div>

      {recipes?.length > 0 ? (
        <>
          <div className="w-full flex flex-wrap justify-center gap-10 px-5 py-10">
            {recipes.map((item, index) => (
              <RecipeCard recipe={item} key={index} />
            ))}
          </div>

          <div className="flex w-full items-center justify-center py-10">
            <Button
              title="Show More"
              containerStyle="bg-green-800 text-white px-4 py-2 rounded-full text-md"
              handleClick={showMore}
            />
          </div>
        </>
      ) : (
        <div className="text-white w-full flex items-center justify-center py-10">
          <p className="text-center">No Recipe Found</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;
