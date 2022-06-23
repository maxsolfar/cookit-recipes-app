import "./App.css";

import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage/LandingPage";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import RecipeDetail from "./components/pages/RecipeDetail/RecipeDetail";
import CreateRecipe from "./components/pages/CreateRecipe/CreateRecipe";

import Header from "./components/organisms/Header/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipes" element={<Home />} />
        <Route path="/recipes/:idRecipe" element={<RecipeDetail />} />
        <Route path="/new-recipe" element={<CreateRecipe />} />

        <Route path="/navbar" element={<Header />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
