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
            <div className='overlay'>
              <h1>Jujutsu Kaisen</h1>
            </div>
          </div>
          <div className='item'>
            <img src={onepiece} alt='One Piece'/>
            <div className='overlay'>
              <h1>One Piece</h1>
            </div>
          </div>
          <div className='item'>
            <img src={fireforce} alt='Fire Force'/>
            <div className='overlay'>
              <h1>Fire Force</h1>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='item'>
            <img src={naruto} alt='Naruto'/>
            <div className='overlay'>
              <h1>Naruto</h1>
            </div>
          </div>
          <div className='item'>
            <img src={myheroacademia} alt='My Hero Academia'/>
            <div className='overlay'>
              <h1>My Hero Academia</h1>
            </div>
          </div>
          <div className='item'>
            <img src={attackontitan} alt='Attack on Titan'/>
            <div className='overlay'>
              <h1>Attack on Titan</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
