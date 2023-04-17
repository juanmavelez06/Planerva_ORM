import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BudgetPages from "./pages/BudgetPages";
import NotFoundPage from "./pages/NotFoundPage";
import AppFooter from "./components/AppFooter/AppFooter";

import "./App.css";

function App() {
  return (
    <React.Fragment>  
      <div className="app-ctn">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/budget/*" element={<BudgetPages />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* AppFooter */}
      </div>
      <AppFooter />
    </React.Fragment>
  );
}

export default App;
