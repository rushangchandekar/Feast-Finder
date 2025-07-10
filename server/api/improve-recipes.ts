import { Router, Request, Response, RequestHandler } from 'express';
import axios from 'axios';

const router = Router();

const improveRecipeHandler: RequestHandler = async (req: Request, res: Response) => {
  const { recipe, feedback } = req.body;

  if (!recipe || !feedback) {
    res.status(400).json({ error: 'Missing recipe or feedback' });
    return;
  }

  const prompt = `Recipe: ${recipe}\nFeedback: ${feedback}\nImprove this recipe based on the feedback.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ improvedRecipe: result });
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

router.post('/', improveRecipeHandler);

export default router;
