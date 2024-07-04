import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kitchen from "./Kitchen";
import ProblemList from "./ProblemList";
import Order from "./Order";
import MealEditor from "./MealEditor";
import Login from "./login";
import Layout from "./Layout";
import RequireAuth from "./RequiredAuth";

import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/order" element={<Order />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/kitchen" element={<Kitchen />} />
            </Route>

            <Route path="/problem-list" element={<ProblemList />} />

            <Route element={<RequireAuth />}>
              <Route path="/meal-editor" element={<MealEditor />} />
            </Route>

            {/* <Route path="*" element={() => <h1>Page Not Found</h1>} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
