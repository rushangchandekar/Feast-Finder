import { Routes, Route, Outlet } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from "./pages/RecipeDetail";
import FridgeFeastPage from './pages/SmartChef';
import RootLayout from './components/RootLayout';

function App() {
  return (
    <Routes>
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
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="smartchef" element={<FridgeFeastPage />} />
      </Route>
    </Routes>
  );
}

export default App;