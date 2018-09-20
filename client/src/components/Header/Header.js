import React from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="media">
        <img src={user.avatar} alt="" className="mr-5 rounded-circle" />
        <div className="media-body align-self-center">
          <div className="lead">
            {user.username}{" "}
            <button className="btn btn-sm btn-outline-dark">
              Edit Profile
            </button>
          </div>
          0 posts{" "}
          <span>{user.followers ? user.followers.length : 0} followers</span>{" "}
          <span>{user.following ? user.following.length : 0} following</span>
          <div>description here</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
