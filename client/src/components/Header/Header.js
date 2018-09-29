import React from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
import "./Header.css";

const Header = props => {
  const user = JSON.parse(localStorage.getItem("Auth"));
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="row">
        <div className="col-sm-12 col-md-4 mx-auto">
          <img src={props.user.avatar} alt="" className="mr-5 rounded-circle" />
        </div>
        <div className="col-sm-12 col-md-8">
          <div className="lead username">
            {props.user.username}{" "}
            {props.user._id === user.id ? (
              <button className="ml-2 btn btn-sm btn-outline-dark">
                <span className="ml-3 mr-3">Edit Profile</span>
              </button>
            ) : (
              <button
                className="ml-2 btn btn-sm btn-primary"
                onClick={() => props.follow(props.user._id)}
              >
                <span className="ml-3 mr-3">Follow</span>
              </button>
            )}
          </div>
          <div className="d-flex mt-3">
            <div className="mr-4">
              <a href="/" className="headerLinks">
                100
              </a>
              posts
            </div>
            <div className="mr-4">
              <a href="/" className="headerLinks">
                {props.user.followers && props.user.followers.length}{" "}
              </a>
              followers
            </div>
            <div className="mr-4">
              <a href="/" className="headerLinks">
                123
              </a>
              following
            </div>
          </div>
          <div className="mt-3">
            <strong>Full Name</strong>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
            exercitationem praesentium ad, facere atque voluptas quam ducimus
            mollitia similique voluptate ex tempore eaque doloribus aspernatur
            officiis, voluptatibus magnam! Natus, earum!
          </div>
          <div className="mt-2">
            <small className="text-muted">Followed by bob, nico, chad</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
