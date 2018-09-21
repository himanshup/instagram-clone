import React from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiEdit2,
  FiTrash2
} from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";
import "./DisplayPost.css";

const DisplayPost = ({ post }) => {
  return (
    <div className="container mt-5">
      {post &&
        post.author && (
          <div className="row no-gutters d-flex justify-content-center">
            <div className="col-12 col-sm-6 d-none d-sm-block">
              <div className="card d-flex justify-content-center rounded-0 border-right-0 h-100">
                <img
                  src={post.image}
                  alt=""
                  className="rounded-0 img-fluid align-self-center"
                />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="card rounded-0 displayCard h-100">
                <div className="card-header bg-white p-3 d-block d-sm-none">
                  <img
                    src={post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link to={`/users/${post.author.id}`} className="feedLinks">
                    {post.author.username}
                  </Link>
                </div>
                <img
                  src={post.image}
                  alt=""
                  className="rounded-0 card-img-top d-block d-sm-none"
                />
                <div className="p-3 d-none d-sm-block">
                  <img
                    src={post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link to={`/users/${post.author.id}`} className="feedLinks">
                    {post.author.username}
                  </Link>
                  <hr />
                  <div>
                    <Link to={`/users/${post.author.id}`} className="feedLinks">
                      {post.author.username}
                    </Link>{" "}
                    {post.description}
                  </div>
                </div>
                <div className="p-3">
                  <div>
                    <FiHeart className="mr-2 feedIcons" />
                    <FiMessageCircle className="mr-2 feedIcons msgCircle" />
                    {post.author.id ===
                    JSON.parse(localStorage.getItem("Auth")).id ? (
                      <span>
                        <FiTrash2 className="feedIcons float-right" />
                        <Link to={`/edit/${post._id}`}>
                          <FiEdit2 className="feedIcons text-dark float-right mr-2" />
                        </Link>
                      </span>
                    ) : (
                      <FiBookmark className="feedIcons float-right" />
                    )}
                  </div>
                  <div>
                    <Link to="/" className="feedLinks">
                      {post.likes.length} likes
                    </Link>
                  </div>
                  <div className="d-block d-sm-none">
                    <Link to={`/users/${post.author.id}`} className="feedLinks">
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
                  <hr />
                  <small className="text-muted">Add a comment..</small>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DisplayPost;
