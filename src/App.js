import React, { Component } from 'react';
import jujutsu from './images/jujutsu.jpg'
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <img src={jujutsu} alt='Jujutsu'/>
        <br /><br /><br />
        <div className='container'>
          <div className='item'>One Piece</div>
          <div className='item'>Fire Force</div>
          <div className='item'>Jujutsu Kaisen</div>
        </div>
        <div className='container'>
          <div className='item'>My Hero Academia</div>
          <div className='item'>Attack on Titian</div>
          <div className='item'>OverLord</div>
        </div>
      </div>
    );
  }
}
export default App;
