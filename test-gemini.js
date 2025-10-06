// test-gemini.js
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// Print API key details
const apiKey = process.env.GEMINI_API_KEY;
console.log('API key defined:', !!apiKey);
console.log('API key length:', apiKey ? apiKey.length : 0);
console.log('API key prefix:', apiKey ? apiKey.substring(0, 4) + '...' : 'none');

// List available models first
async function listModels() {
  console.log('Listing available models...');
  
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );
    
    console.log('Available models:');
    for (const model of response.data.models) {
      console.log(`- ${model.name} (${model.displayName})`);
    }
    
    return response.data.models;
  } catch (error) {
    console.error('Failed to list models:', error.message);
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
    }
    return [];
  }
}

// Test the Gemini API
async function testGeminiAPI() {
  console.log('Testing Gemini API...');
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello, please respond with a simple 'Hello, world!'" }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100
        }
      }
    );
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', JSON.stringify(response.data, null, 2));
    console.log('Test successful!');
    return true;
  } catch (error) {
    console.error('API Error:', error.message);
    
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    console.error('Test failed!');
    return false;
  }
}

// Run the tests
async function runTests() {
  await listModels();
  await testGeminiAPI();
}

runTests();