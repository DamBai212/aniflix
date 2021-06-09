import React from 'react'
import getGallery from './getGallery.js'
import Anime from './Anime.js';

export default function Gallery() {
    return (
        <div>
            <div className='container'>
               {
                   getGallery().map(anime=> (
                       <Anime
                       key={anime.id} 
                       id={anime.id} 
                       name={anime.name} 
                       cover={anime.cover}/>
                   ))
               }
            </div>
        </div>
        
    )
}

