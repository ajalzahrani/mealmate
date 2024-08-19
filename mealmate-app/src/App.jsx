import React from "react";
import { Routes, Route } from "react-router-dom";
import ProblemList from "./pages/ProblemList";
import Kitchen from "./pages/Kitchen";
import Order from "./pages/Order";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequiredAuth";
import Missing from "./components/Missing";
import MealEditor from "./MealEditor";
import Layout from "./Layout";

import "./style/App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/problem-list" element={<ProblemList />} />

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/order" element={<Order />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/kitchen" element={<Kitchen />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/meal-editor" element={<MealEditor />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
