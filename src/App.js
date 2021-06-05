import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './Gallery.js';
import Details from './Details.js'
import './App.css';
import NotFound from './NotFound.js';

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <h1> Welcome to AniFlix</h1>
          <br /><br /><br />
          <Switch>
          <Route exact path= '/' component={Gallery} />
          {/* made details url dynamic */}
          <Route exact path='/not-found' component={NotFound} />
          <Route exact path='/:coverId' component={Details} />
          </Switch>
        </div>
      </Router>
      
    );
  }
}


export default App;
