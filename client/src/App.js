import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import BeerAdmin from "./components/auth/BeerAdmin";
import FoodAdmin from "./components/auth/FoodAdmin";
import EventsAdmin from "./components/auth/EventsAdmin";
import Main from "./components/Main/Main";
import Beerlist from "./components/Beerlist/beerlist";
import Events from "./components/Events/Events";
import Menu from "./components/Menu/Menu";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/beerlist" component={Beerlist} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/Menu" component={Menu} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addFood" component={FoodAdmin} />
            <Route exact path="/addBeer" component={BeerAdmin} />
            <Route exact path="/addEvents" component={EventsAdmin} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
