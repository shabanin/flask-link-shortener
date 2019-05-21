import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Create from "./components/Create.jsx";
import Stats from "./components/Stats.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Create} />
          <Route path="/stats" exact component={Stats} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
