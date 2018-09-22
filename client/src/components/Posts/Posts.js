import React from "react";

import { Link } from "react-router-dom";
import Comment from "../../containers/Comment/Comment";
import Icons from "../../containers/Icons/Icons";
import moment from "moment";
import "./Posts.css";

const Posts = ({ posts, props }) => {
  return (
    <div className="container">
      <div className="row">
        {posts &&
          posts.map(post => (
            <div
              key={post._id}
              className="col-12 d-flex justify-content-center"
            >
              <div className="card feedCard mt-5">
                <div className="card-header bg-white p-3">
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
                  className="card-img-top rounded-0"
                />
                <div className="p-3">
                  <Icons authorId={post.author.id} postId={post._id} />
                  <div className="mt-2">
                    <Link to="/" className="feedLinks">
                      {post.likes.length} likes
                    </Link>
                  </div>
                  <div className="mt-1">
                    <Link to={`/users/${post.author.id}`} className="feedLinks">
                      {post.author.username}
                    </Link>{" "}
                    {post.description}
                  </div>
                  {post.comments &&
                    post.comments.map(comment => (
                      <div key={comment._id}>
                        <Link
                          to={`/users/${comment.author.id}`}
                          className="feedLinks"
                        >
                          {comment.author.username}
                        </Link>{" "}
                        {comment.text}
                      </div>
                    ))}
                  <div>
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-uppercase postDate"
                    >
                      {moment(post.timePosted).fromNow()}
                    </Link>
                  </div>
                  <hr />
                  <Comment postId={post._id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
