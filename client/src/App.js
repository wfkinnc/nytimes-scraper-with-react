import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Articles from "./pages/Articles";
// import Nav from "./components/Nav.js"


const App = () =>
  <Router>
    <div>
      <Switch>
          <Route exact path="/" component={Articles} />
      </Switch>  
  </div>
  </Router>



export default App;
