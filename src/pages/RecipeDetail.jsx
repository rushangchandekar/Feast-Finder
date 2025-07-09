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
  window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Add this
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
    <div className='w-full'>
      <Header title={recipe?.strMeal} image={recipe?.strMealThumb} />

      <div className='w-full px-4 lg:px-20 pt-5'>
        <div className='w-full flex flex-col md:flex-row gap-8 py-20'>
          {/* LEFT SIDE - Ingredients & Tags */}
          <div className='w-full md:w-2/4 md:border-r border-slate-800 pr-4'>
            {/* Ingredients */}
            <div className='flex flex-col gap-5'>
              <p className='text-green-500 text-2xl underline'>Ingredients</p>
              {
                Array.from({ length: 20 }, (_, i) => {
                  const ingredient = recipe?.[`strIngredient${i + 1}`];
                  const measure = recipe?.[`strMeasure${i + 1}`];
                  return (
                    ingredient && (
                      <p key={i} className='text-neutral-100 flex gap-2'>
                        <AiFillPushpin className='text-green-800 text-xl' />
                        {measure} {ingredient}
                      </p>
                    )
                  );
                })
              }
            </div>

            {/* Tags */}
            <div className='flex flex-col gap-3 mt-20'>
              <p className='text-green-500 text-2xl underline'>Health Labels</p>
              <div className='flex flex-wrap gap-4'>
                {
                  recipe?.strTags
                    ? recipe.strTags.split(',').map((item, index) => (
                        <p
                          className='text-white flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-full'
                          key={index}
                        >
                          <BsPatchCheck color='green' /> {item.trim()}
                        </p>
                      ))
                    : <p className='text-neutral-400'>No tags available</p>
                }
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Video */}
          <div className='w-full md:w-2/4 flex flex-col items-center justify-center'>
            {
              recipe?.strYoutube && (
                <div className='w-full'>
                  <p className='text-green-500 text-2xl underline mb-3'>Tutorial</p>
                  <div className='w-full aspect-video rounded-lg overflow-hidden'>
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
          </div>
        </div>
      </div>
    </div>
  );

}

export default RecipeDetail