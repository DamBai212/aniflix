import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Details extends Component {
    
    constructor() {
        super();
        debugger;
        this.state = {
            welcomeMesssage: 'Welcome to the details page, WIP :)'
        };
    }

    componentDidMount() {
        debugger;
        setTimeout(() => {
            debugger;
            this.setState({
               welcomeMesssage: 'More content coming soon!!!!'
            });   
        }, 3000);
    }
    
    
    render() {
        debugger;
        return (
            <div>
                <h1>{this.state.welcomeMesssage}</h1>
                <Link to='/'>Back to home page</Link>
            </div>
        )

    }

}

