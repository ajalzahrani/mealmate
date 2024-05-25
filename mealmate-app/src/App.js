import "./App.css"; // Import the CSS file for styling
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Kitchen from "./Kitchen";
import ProblemList from "./ProblemList";
import Order from "./Order";

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
              <Link to="/kitchen" className="nav-link">
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
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/problem-list" component={ProblemList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
