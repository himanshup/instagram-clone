import React, { Component } from "react";
import { Router, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Secret from "./Secret";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./App.css";
import history from "./history";

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user
  };
};

class App extends Component {
  componentDidMount() {
    console.log(localStorage.Auth);
    console.log(this.props);
  }
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <Router history={history}>
        <div>
          {localStorage.Auth ? (
            <div>
              <nav class="navbar navbar-light bg-white border-bottom">
                <div className="container">
                  <a class="navbar-brand" href="#">
                    Navbar
                  </a>
                  <Link to="/">Home</Link>
                </div>
              </nav>
              <Link to="/secret">Posts</Link>
              <button onClick={this.handleLogout}>Logout</button>
              <Route exact path="/secret" component={Secret} />
            </div>
          ) : (
            <div>
              <div className="container mt-5">
                <Route exact path="/" component={Home} />
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(App);
