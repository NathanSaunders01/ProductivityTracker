import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// Redux Imports
import {
  getCurrentUser,
  loadCurrentUser,
  setCurrentUser
} from "./actions/authActions";

// Utility Imports
import Auth from "./utils/Auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

// Container Imports
import Landing from "./containers/Landing/Landing";
import Dashboard from "./containers/Dashboard/Dashboard";

store.dispatch(loadCurrentUser());

const token = Auth.getToken();
// Check for token
if (token) {
  // Set auth token header
  setAuthToken(token);

  // Get user data
  store.dispatch(getCurrentUser(token));
} else {
  store.dispatch(setCurrentUser({}));
}

const client = new ApolloClient({
  uri: "/graphql"
});

client
  .query({
    query: gql`
      {
        users {
          id
          email
          authToken
          fullName
          goals {
            title
            frequency
            weekActivityCount
            createdAt
          }
          todos {
            id
            timeLeft
            completed
            createdAt
          }
        }
      }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
