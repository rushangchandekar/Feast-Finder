from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS - allow all for deployment flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment")
else:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
    print("Gemini AI initialized")

class RecipeRequest(BaseModel):
    ingredients: str

class ImproveRequest(BaseModel):
    recipe: str
    feedback: str

# Health check at both root and /api paths for robustness
@app.get("/api/health")
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Routes defined with and without /api prefix
@app.post("/api/generate-recipe")
@app.post("/generate-recipe")
async def generate_recipe(request: RecipeRequest):
    try:
        print(f"\n📝 Ingredients: {request.ingredients}")
        prompt = f"Generate a recipe using these ingredients: {request.ingredients}. Return the response in JSON format with 'title', 'ingredients' (as a list), and 'instructions' (as a list)."
        response = model.generate_content(prompt)
        text = response.text
        try:
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            return json.loads(text)
        except:
            return {
                "title": "AI Generated Recipe",
                "ingredients": request.ingredients.split(','),
                "instructions": text.split('\n')
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/improve-recipes")
@app.post("/improve-recipes")
async def improve_recipe(request: ImproveRequest):
    try:
        prompt = f"Recipe: {request.recipe}\nFeedback: {request.feedback}\nImprove this recipe based on the feedback. Return the improved recipe as text."
        response = model.generate_content(prompt)
        return {"improvedRecipe": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
