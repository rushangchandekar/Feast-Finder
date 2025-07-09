import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import generateRecipeHandler from './server/api/generate-recipe';
import improveRecipeHandler from './server/api/improve-recipes';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/generate-recipe', generateRecipeHandler);
app.post('/api/improve-recipes', improveRecipeHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});