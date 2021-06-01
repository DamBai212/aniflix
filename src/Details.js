import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import getGallery from './getGallery';

export default class Details extends Component {
    
    constructor() {
        super();
        this.state = {
            cover: {}
        };
    }

    componentDidMount() {
        let coverId = this.props.match.params.coverId;
        // Found selected element using a callback function
        let cover = getGallery()
            .find((cover) => { return cover.id === coverId });
        this.setState({ cover });   
       
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.cover.name}</h1>
                <Link to='/'>Back to home page</Link>
            </div>
        );

    }

}

