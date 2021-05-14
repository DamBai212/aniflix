import React, { Component } from 'react';
import jujutsu from './jujutsu.jpg'
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <img src={jujutsu} alt='Jujutsu'/>
        <br /><br /><br />
        <div>
          <div>
            test
          </div>
        </div>
      </div>
    );
  }
}
export default App;
