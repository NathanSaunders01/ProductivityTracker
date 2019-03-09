import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";

// Redux Imports
import { getCurrentUser } from "./actions/authActions";

// Utility Imports
import Auth from "./utils/Auth";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

// Container Imports
import Landing from "./containers/Landing/Landing";
import Dashboard from "./containers/Dashboard/Dashboard";
import Navigation from "./components/Navigation/Navigation";

const token = Auth.getToken();
// Check for token
if (token) {
  // Set auth token header
  setAuthToken(token);

  // Get user data
  store.dispatch(getCurrentUser(token));
}

class App extends Component {
  handleTextChange = e => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Navigation />
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
