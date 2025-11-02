import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Planner from './pages/Planner';
import ShoppingList from './pages/ShoppingList';
import Assistant from './pages/Assistant';
import CookingMode from './pages/CookingMode';
import { PlannerProvider } from './hooks/usePlanner';
import Books from './pages/Books';
import Courses from './pages/Courses';
import Products from './pages/Products';
import News from './pages/News';

const App: React.FC = () => {
  return (
    <PlannerProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<Recipes />} />
            <Route path="/anime/:id" element={<RecipeDetail />} />
            <Route path="/watch/:id" element={<CookingMode />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/watchlist" element={<ShoppingList />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/manga" element={<Books />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Layout>
      </HashRouter>
    </PlannerProvider>
  );
};

export default App;