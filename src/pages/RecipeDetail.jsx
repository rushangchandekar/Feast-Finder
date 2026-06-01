import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRecipe, fetchRecipes } from '../lib'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { AiFillPushpin } from "react-icons/ai"
import { BsPatchCheck } from "react-icons/bs"
import RecipeCard from '../components/RecipeCard'

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const getRecipe = async (id) => {
    try {
      setLoading(true)

      const data = await fetchRecipe(id)

      setRecipe(data)

      const recommend = await fetchRecipes({ query: recipe?.label, limit: 5 })

      setRecipes(recommend)

      setLoading(false)

    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getRecipe(id);
  }, [id]);

  if (loading) {
    return (
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full bg-white dark:bg-[hsl(220,20%,8%)] text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Header title={recipe?.strMeal} image={recipe?.strMealThumb} />

      <div className='w-full px-4 lg:px-20 pt-5'>
        <div className='w-full flex flex-col md:flex-row gap-8 py-12'>
          {/* LEFT SIDE - Ingredients & Tags */}
          <div className='w-full md:w-2/4 md:border-r border-gray-200 dark:border-white/10 pr-4'>
            {/* Ingredients */}
            <div className='flex flex-col gap-5'>
              <p className='text-emerald-600 dark:text-emerald-400 text-2xl font-bold border-b border-emerald-100 dark:border-emerald-500/20 pb-2'>Ingredients</p>
              {
                Array.from({ length: 20 }, (_, i) => {
                  const ingredient = recipe?.[`strIngredient${i + 1}`];
                  const measure = recipe?.[`strMeasure${i + 1}`];
                  return (
                    ingredient && (
                      <p key={i} className='text-gray-700 dark:text-gray-300 flex items-center gap-2 py-1 border-b border-gray-50 dark:border-white/5'>
                        <AiFillPushpin className='text-emerald-600 dark:text-emerald-400 text-xl flex-shrink-0' />
                        <span className="font-medium">{measure}</span> {ingredient}
                      </p>
                    )
                  );
                })
              }
            </div>

            {/* Tags */}
            <div className='flex flex-col gap-3 mt-12'>
              <p className='text-emerald-600 dark:text-emerald-400 text-2xl font-bold border-b border-emerald-100 dark:border-emerald-500/20 pb-2'>Health Labels</p>
              <div className='flex flex-wrap gap-3 mt-3'>
                {
                  recipe?.strTags
                    ? recipe.strTags.split(',').map((item, index) => (
                        <p
                          className='text-gray-700 dark:text-gray-300 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-500/20'
                          key={index}
                        >
                          <BsPatchCheck className="text-emerald-600 dark:text-emerald-400" /> {item.trim()}
                        </p>
                      ))
                    : <p className='text-gray-500 dark:text-gray-400 italic'>No tags available</p>
                }
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Video */}
          <div className='w-full md:w-2/4 flex flex-col'>
            {
              recipe?.strYoutube && (
                <div className='w-full'>
                  <p className='text-emerald-600 dark:text-emerald-400 text-2xl font-bold border-b border-emerald-100 dark:border-emerald-500/20 pb-2 mb-4'>Tutorial</p>
                  <div className='w-full aspect-video rounded-lg overflow-hidden shadow-lg'>
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            }

            {/* Instructions (Added) */}
            {recipe?.strInstructions && (
              <div className='mt-8'>
                <p className='text-emerald-600 dark:text-emerald-400 text-2xl font-bold border-b border-emerald-100 dark:border-emerald-500/20 pb-2 mb-4'>Instructions</p>
                <div className='text-gray-700 dark:text-gray-300 leading-relaxed space-y-4'>
                  {recipe.strInstructions.split('\r\n').filter(Boolean).map((instruction, index) => (
                    <p key={index} className='flex gap-2'>
                      <span className='font-bold text-emerald-600 dark:text-emerald-400'>{index + 1}.</span> {instruction}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail