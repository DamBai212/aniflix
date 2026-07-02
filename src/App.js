import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './Gallery.js';
import Animes from './Animes.js';
import Details from './Details/Details.js'
import './App.css';
import NotFound from './NotFound.js';
import NavBar from './NavBar/NavBar.js'
import StaticPage from './StaticPage.js';
import { AnimeDataProvider } from './data/AnimeDataContext.js';

class App extends Component{
  render() {
    return (
      <Router>
        <AnimeDataProvider>
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path= '/' component={Gallery} />
              <Route
                exact
                path='/animes'
                component={Animes}
              />
              <Route
                exact
                path='/contacts'
                render={() => (
                  <StaticPage
                    title='Contacts'
                    body='Reach out to the AniFlix team at contact@aniflix.example for questions and support.'
                  />
                )}
              />
              <Route
                exact
                path='/sign-up'
                render={() => (
                  <StaticPage
                    title='Sign up'
                    body='Create your AniFlix account to save favorites and keep track of the anime you want to watch next.'
                  />
                )}
              />
              <Route exact path='/not-found' component={NotFound} />
              <Route exact path='/:animeId' component={Details} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </AnimeDataProvider>
      </Router>
      
    );
  }
}


export default App;
