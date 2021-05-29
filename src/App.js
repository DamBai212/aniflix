import React, { Component } from 'react';
import Gallery from './Gallery.js';
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <br /><br /><br />
        <Gallery />
      </div>
    );
  }
}


export default App;
