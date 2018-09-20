import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import history from "../../history";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Feed from "../Feed/Feed";
import NewPost from "../NewPost/NewPost";

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    redirect: state.auth.redirectTo
  };
};

const renderRedirect = () => {
  return <Redirect to="/posts" />;
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
          <Navbar />
          {localStorage.Auth ? (
            <div>
              <Route exact path="/" component={renderRedirect} />
              <Route exact path="/posts" component={Feed} />
              <Route path="/posts/new" component={NewPost} />
            </div>
          ) : (
            <div>
              {this.props.redirect && <Redirect to="/posts" />}
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
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
