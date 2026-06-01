<div align="center">

# 🍽️ Feast Finder

**Discover thousands of recipes. Let AI cook up something special from what's in your fridge.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.5_Flash-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## ✨ Overview

**Feast Finder** is a full-stack recipe discovery web application with an AI-powered twist. Browse, search, and explore thousands of real recipes from The MealDB. When inspiration runs dry, use the **SmartChef** feature to tell the AI what ingredients you have on hand — and watch it generate a personalized, step-by-step recipe just for you.

Built with a modern aesthetic — glassmorphism UI, animated hero sections, dark/light mode toggle, and a fully responsive layout. It's designed to feel premium from the first glance.

---

## 🚀 Features

### 🔍 Recipe Discovery
- Browse a curated library of recipes powered by **The MealDB API**
- Search recipes by name in real-time
- Click any recipe card to see the full details: ingredients, measurements, step-by-step instructions, and cuisine origin

### 🤖 SmartChef (AI Recipe Generator)
- Type the ingredients you already have at home
- Powered by **Google Gemini 2.5 Flash**, the AI generates a complete recipe with ingredients and instructions
- Give feedback on the generated recipe — the AI will **refine and improve** it for you
- **Save your favourite generated recipes** locally in your browser for later

### 🌗 Dark / Light / System Theme
- Full dark mode and light mode support
- Follows your OS system preference by default
- Toggle with a single click in the navbar — preference is persisted across sessions

### 📱 Fully Responsive
- Looks great on mobile, tablet, and desktop
- Smooth scroll-reveal animations and hover micro-interactions throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite 7 |
| **Styling** | Tailwind CSS v3 + Custom CSS |
| **UI Components** | Radix UI (accessible primitives) |
| **AI Backend** | FastAPI + Google Gemini 2.5 Flash |
| **Form Handling** | React Hook Form + Zod validation |
| **Routing** | React Router DOM v6 |
| **Recipe Data** | The MealDB Public API |
| **State Persistence** | localStorage (custom hook) |
| **Deployment** | Vercel (frontend + serverless API) |

---

## 📁 Project Structure

```
feast-finder/
├── api/
│   ├── index.py            # FastAPI backend (Vercel serverless)
│   └── requirements.txt    # Python dependencies
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives (button, card, etc.)
│   │   ├── Footer.jsx
│   │   ├── Header.jsx      # Animated hero section
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx      # Glass nav with theme toggle
│   │   ├── RecipeCard.jsx
│   │   ├── Recipes.jsx
│   │   ├── RootLayout.tsx
│   │   ├── SearchBar.jsx
│   │   └── theme-provider.tsx
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── index.js        # MealDB API utilities
│   │   └── utils.ts        # Tailwind class merger
│   ├── pages/
│   │   ├── Home.jsx        # Landing page with features & sections
│   │   ├── RecipeDetail.jsx
│   │   └── SmartChef.tsx   # AI recipe generator
│   ├── App.jsx             # Route definitions
│   ├── globals.css         # Design system tokens & animations
│   └── main.jsx            # React entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── vercel.json             # Routing config for Vercel deployment
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.10+
- A [Google AI Studio](https://aistudio.google.com/) API key (free)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/feast-finder.git
cd feast-finder
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Python Dependencies

```bash
pip install -r api/requirements.txt
```

### 5. Start the Backend Server

```bash
cd api
python index.py
```

The backend API will start at `http://localhost:8000`.

### 6. Start the Frontend Dev Server

Open a new terminal and run:

```bash
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## 🔑 API Endpoints

The FastAPI backend exposes the following routes:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/generate-recipe` | Generate a recipe from ingredients |
| `POST` | `/api/improve-recipes` | Refine a recipe based on feedback |

### Example Request — Generate Recipe

```bash
curl -X POST http://localhost:8000/api/generate-recipe \
  -H "Content-Type: application/json" \
  -d '{"ingredients": "chicken, garlic, lemon, olive oil"}'
```

### Example Response

```json
{
  "title": "Lemon Garlic Roast Chicken",
  "ingredients": [
    "2 chicken breasts",
    "4 cloves garlic, minced",
    "1 lemon, zested and juiced",
    "2 tbsp olive oil",
    "Salt and pepper to taste"
  ],
  "instructions": [
    "Preheat oven to 400°F (200°C).",
    "Mix garlic, lemon juice, zest, and olive oil.",
    "Coat chicken and marinate for 15 minutes.",
    "Roast for 25-30 minutes until cooked through."
  ]
}
```

---

## 🌐 Deploying to Vercel

This project is pre-configured for one-click deployment to Vercel.

1. Push your code to GitHub
2. Import the repository into [Vercel](https://vercel.com/new)
3. Add your `GEMINI_API_KEY` in **Settings → Environment Variables**
4. Deploy! Vercel automatically serves the React frontend and the Python `api/index.py` as a serverless function.

The `vercel.json` configuration handles all SPA routing and API rewrites automatically.

---

## 📸 Pages at a Glance

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero, recipe search & browse, features section |
| **Recipe Detail** | `/recipes/:id` | Full recipe with ingredients & instructions |
| **SmartChef** | `/smartchef` | AI recipe generator from your ingredients |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Rushang Chandekar**

⭐ If you found this useful, consider giving it a star!

</div>
