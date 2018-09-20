import React from "react";
import { FiHeart, FiMessageCircle, FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Posts.css";

const Posts = ({ posts }) => {
  console.log("from posts", posts);
  return (
    <div className="container">
      <div className="row">
        {posts &&
          posts.map(post => (
            <div
              key={post._id}
              className="col-12 d-flex justify-content-center"
            >
              <div className="card feedCard rounded-0 mt-5">
                <div className="card-header bg-white p-3">
                  <img
                    src={post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link to={`/user/${post.author.id}`} className="feedLinks">
                    {post.author.username}
                  </Link>
                </div>
                <img
                  src={post.image}
                  alt=""
                  className="card-img-top rounded-0"
                />
                <div className="card-body">
                  <div>
                    <FiHeart className="mr-2 feedIcons" />
                    <FiMessageCircle className="mr-2 feedIcons msgCircle" />
                    <FiBookmark className="feedIcons float-right" />
                  </div>
                  <div className="mt-2">
                    <Link to="/" className="feedLinks">
                      {post.likes.length} likes
                    </Link>
                  </div>
                  <div className="mt-1">
                    <Link to={`/user/${post.author.id}`} className="feedLinks">
                      {post.author.username}
                    </Link>{" "}
                    {post.description}
                  </div>
                  <div>
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-uppercase postDate"
                    >
                      {moment(post.timePosted).fromNow()}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
