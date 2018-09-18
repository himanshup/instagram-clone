import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
