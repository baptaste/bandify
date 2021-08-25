// == Import
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// connected components
import Home from 'src/containers/Home';
import Profiles from 'src/containers/Profiles';
import Login from 'src/containers/Login';
import Signup from 'src/containers/Signup';
import Navbar from 'src/containers/Navbar';
import Header from 'src/containers/Header';
// components
import Contact from 'src/components/Contact';
import About from 'src/components/About';
import Footer from 'src/components/Footer';

// == Import
import './style.scss';
import axios from 'axios';

// == Composant
export default function App({ isLogged, setReconnect }) {
  // AU premier rendu, je veux recupérer mon token
  useEffect(() => {
    // On récupère notre token
    const token = localStorage.getItem('token');
    console.log('token', token);
    // Si on en a un, on fait une requête vers le serveur
    // En y emporter au passage, le "timbre" (headers : x-acces-token)
    if (token) {
      axios.post('http://localhost:3000/checkToken', {
        headers: {
          'x-acces-token': localStorage.getItem('token')
        }
      })
      .then((response) => {
        // On crée un objet user en réponse, pour rester logger
        const user = {
          id: localStorage.getItem('userId'),
          email: localStorage.getItem('userEmail'),
          token: localStorage.setItem('token', response.data.token),
        };
        setReconnect(user);
      })
      .catch((error) => console.log(error));
  
    }

  }, []);
  return (
    <div className="app">
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/profile" />
        <Route exact path="/search" component={Home} />

        <Route exact path="/search" component={Home} />
        {isLogged
          ? <Route exact path="/member/:profileId" component={Profiles} />
          : <Redirect exact to="/" />}
      </Switch>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

// == Export
