import React from 'react';

export default function Cover(props) {
    return (
      <div className='item'>
        <img src={props.cover} alt={`${props.name} logo`} />
        <div className='overlay'>
          <h3>{props.name}</h3>
        </div>
      </div>
    )
  }

  