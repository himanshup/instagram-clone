import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import "./UserHeader.css";

const UserHeader = props => {
  const user = JSON.parse(localStorage.getItem("Auth"));
  const checkIfFollowing = (followers, id) => {
    if (followers) {
      for (const follower of followers) {
        if (follower._id === id) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  return (
    <div className="container mt-5">
      {props.user && (
        <div>
          <div className="row mb-4">
            <div className="col-sm-12 col-md-4 d-flex justify-content-center">
              <img
                src={props.user.avatar}
                alt=""
                className="mr-5 rounded-circle mx-auto"
                width="150"
                height="150"
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <div className="lead username">
                {props.user.username}{" "}
                {props.user._id === user.id ? (
                  <Link
                    to={`/accounts/${props.user._id}/edit`}
                    className="ml-2 btn btn-sm btn-outline-dark"
                  >
                    <span className="ml-3 mr-3">Edit Profile</span>
                  </Link>
                ) : checkIfFollowing(props.user.followers, user.id) ? (
                  <button
                    className="ml-2 btn btn-sm btn-outline-dark"
                    onClick={() => props.unfollow(props.user._id)}
                  >
                    <span className="ml-3 mr-3">Unfollow</span>
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
                    {props.posts && props.posts.length}{" "}
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
                    {props.user.following && props.user.following.length}{" "}
                  </a>
                  following
                </div>
              </div>
              <div className="mt-3">
                <strong>{props.user.name}</strong>
              </div>
              <p>{props.user.bio}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            {props.posts &&
              props.posts.map(post => (
                <div className="col-12 col-sm-6 col-md-4" key={post._id}>
                  <Link to={`/posts/${post._id}`}>
                    <div
                      className="card border-0 rounded-0 mt-4 mb-2"
                      onMouseEnter={() => props.hoverPost(post._id)}
                      onMouseLeave={() => props.unhoverPost(post._id)}
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="card-img-top rounded-0"
                      />
                      <div
                        className={`card-img-overlay text-white d-flex justify-content-center align-items-center ${
                          props.visible === post._id ? `` : `invisible`
                        }`}
                      >
                        <div className="mr-4">
                          <Icon.Heart
                            className="feedIcons"
                            color="white"
                            fill="white"
                          />{" "}
                          {post.likes.length}
                        </div>
                        <div>
                          <Icon.MessageCircle
                            className="feedIcons msgCircle"
                            color="white"
                            fill="white"
                          />{" "}
                          {post.comments.length}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
