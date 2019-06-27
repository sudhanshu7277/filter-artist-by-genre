import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artists from './Artists'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
        <h1 className="App-title">Apple Itunes Artists List Filter</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/artistlist"/>
                )}/>
                 <Route exact path='/artistlist' component={Artists} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
