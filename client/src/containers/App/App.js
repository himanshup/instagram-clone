import React, { Component } from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import history from "../../history";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Feed from "../Feed/Feed";
import NewPost from "../NewPost/NewPost";
import UserProfile from "../UserProfile/UserProfile";
import Post from "../Post/Post";
import EditPost from "../EditPost/EditPost";
import EditComment from "../EditComment/EditComment";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import EditProfile from "../../containers/EditProfile/EditProfile";
import Explore from "../../containers/Explore/Explore";
import "./App.css";

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    redirect: state.auth.redirectTo
  };
};

const redirectIfNotLoggedIn = () => {
  return <Redirect to="/" />;
};

class App extends Component {
  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("Auth")));
    console.log("from App", this.props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={Navbar} />
          <div className="mb-5 app">
            {localStorage.Auth ? (
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/posts" />} />
                <Route exact path="/posts" component={Feed} />
                <Route path="/explore" component={Explore} />
                <Route path="/posts/new" component={NewPost} />
                <Route path="/users/:userId" component={UserProfile} />
                <Route path="/posts/:postId" component={Post} />
                <Route
                  path="/edit/posts/:postId/comments/:commentId"
                  component={EditComment}
                />
                <Route path="/edit/posts/:postId" component={EditPost} />
                <Route path="/accounts/:userId/edit" component={EditProfile} />
                <Route component={ErrorPage} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={redirectIfNotLoggedIn} />
              </Switch>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(App);
