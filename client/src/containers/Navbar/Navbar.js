import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Navbar.css";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  handleUser = () => {
    this.props.getUser();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
        <div className="container d-flex justify-content-start">
          <Link to={localStorage.Auth ? "/posts" : "/"}>
            <Icon.Instagram className="logo" size={34} />
          </Link>
          <div className="ml-4 mr-4 verticalLine" />
          <Link
            className="navbar-brand"
            to={localStorage.Auth ? "/posts" : "/"}
          >
            Instagram
          </Link>
          {localStorage.Auth && (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/posts/new">
                    <Icon.Edit className="navIcons" size={25} />
                  </Link>
                </li>
                <li className="nav-item active ml-3 mr-3">
                  <span className="nav-link" href="#">
                    <Icon.Heart className="navIcons" size={25} />
                  </span>
                </li>
                <li className="nav-item active mr-3">
                  <Link
                    className="nav-link"
                    to={`/users/${JSON.parse(localStorage.getItem("Auth")).id}`}
                  >
                    <Icon.User className="navIcons" size={25} />
                  </Link>
                </li>

                <li className="nav-item active">
                  <div className="nav-link">
                    <Icon.LogOut
                      className="navIcons"
                      size={25}
                      onClick={this.handleLogout}
                    />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  actions
)(Navbar);
