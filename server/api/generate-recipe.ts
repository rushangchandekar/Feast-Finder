import { Router, Request, Response, RequestHandler } from 'express';
import axios from 'axios';

const router = Router();

const generateRecipeHandler: RequestHandler = async (req: Request, res: Response) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    res.status(400).json({ error: 'No ingredients provided' });
    return;
  }

  try {
    const prompt = `Generate a recipe using these ingredients: ${ingredients}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const resultText = response.data.candidates[0].content.parts[0].text;

    res.json({
      title: "AI Generated Recipe",
      ingredients: ingredients.split(',').map((i: string) => i.trim()),
      instructions: resultText.split('\n').filter((line: string) => line.trim() !== ''),
    });
  } catch (err) {
    console.error('Gemini API error:', err);

    if (axios.isAxiosError(err)) {
      console.error('Axios Response:', err.response?.data);
      console.error('Axios Status:', err.response?.status);
      console.error('Axios Headers:', err.response?.headers);
    }

    res.status(500).json({
      error: 'Gemini API failed',
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

router.post('/', generateRecipeHandler);

export default router;
