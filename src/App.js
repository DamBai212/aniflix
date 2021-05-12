import React, { Component } from 'react';
import jujutsu from './jujutsu.jpg'
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <img src={jujutsu} alt='Jujutsu'/>
      </div>
    );
  }
}
export default App;
