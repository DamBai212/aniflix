import React, { Component } from 'react';
import jujutsu from './images/jujutsu.jpg';
import onepiece from './images/onepiece.jpeg';
import fireforce from './images/fireforce.jpeg';
import naruto from './images/naruto.jpeg';
import attackontitan from './images/attackontitan.jpeg';
import myheroacademia from './images/myheroacademia.jpeg';
import Cover from './Cover.js';
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1> Welcome to AniFlix</h1>
        <br /><br /><br />
        <div className='container'>
          <Cover name='Jujutsu' cover={jujutsu} />
          <Cover name='One Piece' cover={onepiece} />
          <Cover name='Fire Force' cover={fireforce} />
        </div>
        <div className='container'>
          <Cover name='Naruto' cover={naruto} />
          <Cover name='My Hero Academia' cover={myheroacademia} />
          <Cover name='Attack on Titan' cover={attackontitan} />
        </div>
      </div>
    );
  }
}


export default App;
