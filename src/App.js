import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './components/Home';
import { Add } from './components/Add';
import { Edit } from './components/Edit';
import { NavBar } from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';

// Componente geral da aplicação
function App() {
  return (
    <div style={{ maxWidth: "60rem", margin: "4rem auto", marginTop: "0rem", padding: "1rem", paddingTop: "0rem" }}>
      <NavBar />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={Add} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
