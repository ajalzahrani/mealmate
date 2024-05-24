import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Order from "./Order";
import Kitchen from "./Kitchen";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/json-display" className="nav-link">
                Kitchen
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/problem-list" className="nav-link">
                Problem List
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Order} />
          <Route path="/json-display" component={Kitchen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
