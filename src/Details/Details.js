import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import getGallery from '../getGallery';
import './Details.css';

export default class Details extends Component {
    
    constructor() {
        super();
        this.state = {
            anime: {}
        };
    }

    componentDidMount() {
        let animeId = this.props.match.params.animeId;
        // Found selected element using a callback function
        let anime = getGallery()
            .find((anime) => { return anime.id === animeId });
        this.setState({ anime });   
       
    }
    
    render() {
        if(this.state.anime === undefined) {
            return <Redirect to='/not-found' />
        } else {
            return (
                <div className='Details'>
                    <h1>{this.state.anime.name}</h1>
                    <div className='content'>
                        <div className="text"> 
                            {this.state.anime.synopsis}
                        </div>
                        <img 
                            className="image"
                            src={this.state.anime.cover}
                            alt={this.state.anime.name} />
                    </div>
                    <Link to='/'>Back to home page</Link>
                </div>
            );
        }
    }
}

