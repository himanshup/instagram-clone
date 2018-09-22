import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiEdit, FiHeart, FiUser } from "react-icons/fi";
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
          <Link to="/">
            <FiInstagram className="logo" />
          </Link>
          <div className="ml-4 mr-4 verticalLine" />
          <Link className="navbar-brand" to="/">
            Instagram
          </Link>
          {localStorage.Auth && (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/posts/new">
                    <FiEdit className="navIcons" />
                  </Link>
                </li>
                <li className="nav-item active ml-3 mr-3">
                  <span className="nav-link" href="#">
                    <FiHeart className="navIcons" />
                  </span>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to={`/users/${JSON.parse(localStorage.getItem("Auth")).id}`}
                  >
                    <FiUser className="navIcons" />
                  </Link>
                </li>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.handleUser}>user</button>
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
