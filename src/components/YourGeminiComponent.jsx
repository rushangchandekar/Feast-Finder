import { useState } from 'react';
import axios from 'axios';

export default function YourGeminiComponent() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const askGemini = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/gemini', {
        prompt: input,
      });
      setResponse(res.data.result);
    } catch (err) {
      console.error(err);
      setResponse('Error contacting Gemini');
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini..."
      />
      <button onClick={askGemini}>Ask</button>
      <p>{response}</p>
    </div>
  );
}
