import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiEdit, FiHeart, FiUser } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
      <div className="container d-flex justify-content-start">
        <Link to={`${localStorage.Auth ? "/posts" : "/"}`}>
          <FiInstagram className="logo" />
        </Link>
        <div className="ml-4 mr-4 verticalLine" />
        <Link
          className="navbar-brand"
          to={`${localStorage.Auth ? "/posts" : "/"}`}
        >
          Instagram
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active mr-3">
              <Link className="nav-link" to="/posts/new">
                <FiEdit className="navIcons" />
              </Link>
            </li>
            <li className="nav-item active mr-3">
              <span className="nav-link" href="#">
                <FiHeart className="navIcons" />
              </span>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/user">
                <FiUser className="navIcons" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
