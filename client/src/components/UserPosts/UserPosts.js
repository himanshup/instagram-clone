import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import "./UserPosts.css";

const UserPosts = props => {
  return (
    <div className="container">
      <div className="row">
        {props.posts &&
          props.posts.map(post => (
            <div className="col-6 col-sm-6 col-md-4" key={post._id}>
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
  );
};

export default UserPosts;
