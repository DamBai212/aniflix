import React from 'react';
import { Link } from 'react-router-dom';

export default function StaticPage(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <Link to='/'>Back to home page</Link>
        </div>
    );
}
