import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import geminiRouter from './api/gemini.js';
import generateRecipeRouter from './api/generate-recipe.js';
import improveRecipesRouter from './api/improve-recipes.js';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/gemini', geminiRouter);
app.use('/api/generate-recipe', generateRecipeRouter);
app.use('/api/improve-recipes', improveRecipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
