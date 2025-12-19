import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gemini request failed' });
  }
});

export default router;
