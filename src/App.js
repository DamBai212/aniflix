import React, { Component } from 'react';
import jujutsu from './images/jujutsu.jpg';
import onepiece from './images/onepiece.jpeg';
import fireforce from './images/fireforce.jpeg';
import naruto from './images/naruto.jpeg';
import attackontitan from './images/attackontitan.jpeg';
import myheroacademia from './images/myheroacademia.jpeg';
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <br /><br /><br />
        <div className='container'>
          <div className='item'>
            <img src={jujutsu} alt='Jujutsu'/>
          </div>
          <div className='item'>
            <img src={onepiece} alt='One Piece'/>
          </div>
          <div className='item'>
            <img src={fireforce} alt='Fire Force'/>
          </div>
        </div>
        <div className='container'>
          <div className='item'>
            <img src={naruto} alt='Naruto'/>
          </div>
          <div className='item'>
            <img src={myheroacademia} alt='My Hero Academia'/>
          </div>
          <div className='item'>
            <img src={attackontitan} alt='Attack on Titan'/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
