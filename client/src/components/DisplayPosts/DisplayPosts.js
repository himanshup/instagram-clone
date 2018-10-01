import React from "react";
import { Link } from "react-router-dom";
import NewComment from "../../containers/NewComment/NewComment";
import Comments from "../../containers/Comments/Comments";
import Icons from "../../containers/Icons/Icons";
import moment from "moment";
import "./DisplayPosts.css";

const DisplayPosts = props => {
  return (
    <div className="container">
      <div className="row">
        {props.posts &&
          props.posts.map(post => (
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
                    {post.author.username}{" "}
                  </Link>
                </div>
                <img
                  src={post.image}
                  alt=""
                  className="card-img-top rounded-0"
                />
                <div className="p-3">
                  <Icons
                    authorId={post.author.id}
                    postId={post._id}
                    likes={post.likes}
                  />
                  <div className="mt-2">
                    <Link to="/" className="feedLinks">
                      {post.likes.length} likes
                    </Link>
                  </div>
                  {post.description && (
                    <div className="mt-1">
                      <Link
                        to={`/users/${post.author.id}`}
                        className="feedLinks"
                      >
                        {post.author.username}
                      </Link>{" "}
                      {post.description}
                    </div>
                  )}
                  <Comments postId={post._id} comments={post.comments} />
                  <div>
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-uppercase postDate"
                    >
                      {moment(post.timePosted).fromNow()}
                    </Link>
                  </div>
                  <hr />
                  <NewComment postId={post._id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayPosts;
