// Change from:
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import geminiRouter from './api/gemini';
// ...

// To:
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const geminiRouter = require('./api/gemini');
// ...

dotenv.config();

const app = express();
const PORT = 3001;

// Rest of the file remains similar
// Change export default to module.exports at the end

app.use(cors());
app.use(express.json());

app.use('/api/gemini', geminiRouter);
app.use('/api/generate-recipe', generateRecipeRouter);
app.use('/api/improve-recipes', improveRecipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
