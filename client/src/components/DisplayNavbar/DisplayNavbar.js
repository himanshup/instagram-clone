import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import "./DisplayNavbar.css";

const DisplayNavbar = props => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom fixed-top">
      <div className="container d-flex justify-content-start">
        <Link to={localStorage.Auth ? "/posts" : "/"}>
          <Icon.Instagram className="logo" size={25} />
        </Link>
        <div className="ml-3 mr-3 verticalLine d-none d-sm-block" />
        <Link
          className="navbar-brand d-none d-sm-block"
          to={localStorage.Auth ? "/posts" : "/"}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png"
            alt=""
            width="120"
          />
        </Link>

        {localStorage.Auth && (
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* <form className="form-inline ml-auto">
              <input
                type="text"
                className="form-control form-control-sm bg-light text-center"
                placeholder="Search"
              />
            </form> */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/posts/new">
                  <Icon.Edit className="navIcons" size={25} />
                </Link>
              </li>
              <li className="nav-item active ml-3 mr-3">
                <Link className="nav-link" to="/explore">
                  <Icon.Compass className="navIcons" size={25} />
                </Link>
              </li>
              {/* <li className="nav-item active ml-3 mr-3">
                <span className="nav-link" href="#">
                  <Icon.Heart className="navIcons" size={25} />
                </span>
              </li> */}
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
                    onClick={props.logout}
                  />
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DisplayNavbar;
