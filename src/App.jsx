import { Routes, Route, Outlet } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeDetail from "./pages/RecipeDetail";
import FridgeFeastPage from './pages/SmartChef'; // ✅ Make sure this file exports properly

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="smartchef" element={<FridgeFeastPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
