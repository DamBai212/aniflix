import React from 'react'
import getGallery from './getGallery.js'
import Cover from './Cover.js';

export default function Gallery() {
    return (
        <div>
            <div className='container'>
               {
                   getGallery().map(cover => (
                       <Cover
                       key={cover.id} 
                       id={cover.id} 
                       name={cover.name} 
                       cover={cover.cover}/>
                   ))
               }
            </div>
        </div>
        
    )
}

