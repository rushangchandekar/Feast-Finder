// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { VertexAI } from '@google-cloud/vertexai';

dotenv.config();

// --- Configuration ---
// DOUBLE-CHECK THIS VALUE. It must be your Google Cloud Project ID.
const PROJECT_ID = 'fridge-feast-x8n5s'; 
const LOCATION = 'us-central1';

// --- Diagnostics ---
console.log('--- Server Configuration ---');
console.log('Service Account Key File Path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log(`Using Project ID: ${PROJECT_ID}`);
console.log(`Using Location: ${LOCATION}`);
console.log('--------------------------');

// --- Vertex AI Client Initialization ---
let vertex_ai;
try {
  vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
} catch(err) {
  console.error("ERROR: Failed to initialize VertexAI client.");
  console.error("Please ensure you have run 'gcloud auth application-default login' OR that your GOOGLE_APPLICATION_CREDENTIALS environment variable is set correctly.");
  console.error("Full error:", err.message);
  process.exit(1);
}

const generativeModel = vertex_ai.getGenerativeModel({
  model: 'gemini-1.0-pro',
});

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- API Route ---

app.post('/api/generate-recipe', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.trim() === '') {
    return res.status(400).json({ error: 'No ingredients provided' });
  }

  console.log("Generating recipe for ingredients:", ingredients);

  const prompt = `You are a helpful culinary assistant. A user has the following ingredients: ${ingredients}. 
    Suggest a single, delicious dish they can make.
    
    Your response must be formatted in clear sections:
    1.  Start with a creative and appealing "Recipe Name:".
    2.  Follow with an "Ingredients:" list.
    3.  Finally, provide a "Instructions:" section with clear, step-by-step directions.`;

  try {
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    const resp = await generativeModel.generateContent(request);

    if (!resp.response || !resp.response.candidates || resp.response.candidates.length === 0) {
        console.error("Invalid response structure from API:", resp);
        throw new Error("API returned no candidates in the response.");
    }
    
    const resultText = resp.response.candidates[0].content.parts[0].text;
    
    if (!resultText) {
        throw new Error("API returned an empty response text.");
    }

    console.log("Recipe text extracted successfully.");
    res.json({ recipe: resultText });

  } catch (err) {
    console.error("ERROR during Gemini API call:", err);
    res.status(500).json({
      error: 'Gemini API failed during recipe generation',
      details: err.message || 'An unknown error occurred',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});