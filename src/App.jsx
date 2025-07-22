import { Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from "./pages/RecipeDetail";
import FridgeFeastPage from './pages/SmartChef';
import RootLayout from './components/RootLayout';

function App() {
  return (
    <HelmetProvider>
      <Routes>
        {/* The layout is now defined directly here */}
        <Route
          path='/'
          element={
            <RootLayout>
              <Navbar />
              <Outlet />
              <Footer />
            </RootLayout>
          }
        >
          {/* Nested routes remain the same */}
          <Route index element={<Home />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="smartchef" element={<FridgeFeastPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;