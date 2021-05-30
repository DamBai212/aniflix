import React from 'react'
import jujutsu from './images/jujutsu.jpg';
import onepiece from './images/onepiece.jpeg';
import fireforce from './images/fireforce.jpeg';
import naruto from './images/naruto.jpeg';
import attackontitan from './images/attackontitan.jpeg';
import myheroacademia from './images/myheroacademia.jpeg';
import Cover from './Cover.js';

export default function Gallery() {
    return (
        <div>
            <div className='container'>
               <Cover id='jujutsu' name='Jujutsu' cover={jujutsu} />
               <Cover id='onepiece' name='One Piece' cover={onepiece} />
               <Cover id='fireforce' name='Fire Force' cover={fireforce} />
            </div>
            <div className='container'>
               <Cover id='naruto' name='Naruto' cover={naruto} />
               <Cover id='myheroacademia' name='My Hero Academia' cover={myheroacademia} />
               <Cover id='attackontitan' name='Attack on Titan' cover={attackontitan} />
            </div>
        </div>
        
    )
}
