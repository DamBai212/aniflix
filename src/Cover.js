import React from 'react';
import { Link } from 'react-router-dom'

export default function Cover(props) {
    return (
      <Link to={`/${props.id}`} className='item'>
        <img src={props.cover} alt={`${props.name} logo`} />
        <div className='overlay'>
          <h3>{props.name}</h3>
        </div>
      </Link>
    )
  }

  