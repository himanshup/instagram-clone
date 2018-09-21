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
import UserProfile from "../UserProfile/UserProfile";

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
    console.log(JSON.parse(localStorage.getItem("Auth")));
    console.log("from App", this.props);
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
              <Route
                path="/users/:id"
                render={({ match }) => <UserProfile params={match.params} />}
              />
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
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
