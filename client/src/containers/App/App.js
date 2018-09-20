import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./App.css";
import history from "../../history";
import { FaInstagram } from "react-icons/fa";

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    msg: state.auth.msg
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
        {localStorage.Auth ? (
          <div>
            <nav className="navbar navbar-light bg-white border-bottom">
              <div className="container d-flex justify-content-start">
                <Link to="/">
                  <FaInstagram className="logo" />
                </Link>
                <div className="ml-4 mr-4 verticalLine" />
                <Link className="navbar-brand" to="/">
                  Instagram
                </Link>
              </div>
            </nav>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <nav className="navbar navbar-light bg-white border-bottom">
              <div className="container d-flex justify-content-start">
                <Link to="/">
                  <FaInstagram className="logo" />
                </Link>
                <div className="ml-4 mr-4 verticalLine" />
                <Link className="navbar-brand" to="/">
                  Instagram
                </Link>
              </div>
            </nav>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        )}
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(App);
