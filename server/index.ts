import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import geminiRouter from './api/gemini';
import generateRecipeRouter from './api/generate-recipe';
import improveRecipesRouter from './api/improve-recipes';

dotenv.config();

const app: Application = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/gemini', geminiRouter);
app.use('/api/generate-recipe', generateRecipeRouter);
app.use('/api/improve-recipes', improveRecipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
