import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Gallery from './Gallery.js';
import Details from './Details.js'
import './App.css';

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <h1> Welcome to AniFlix</h1>
          <br /><br /><br />
          <Route exact path= '/' component={Gallery} />
          {/* made details url dynamic */}
          <Route exact path='/:coverId' component={Details} />
        </div>
      </Router>
      
    );
  }
}


export default App;
