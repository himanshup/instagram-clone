import React from "react";
import { Link } from "react-router-dom";
import Comment from "../../containers/Comment/Comment";
import Comments from "../../containers/Comments/Comments";
import Icons from "../../containers/Icons/Icons";
import moment from "moment";
import "./DisplayPost.css";

const DisplayPost = props => {
  return (
    <div className="container mt-5">
      {props.post &&
        props.post.author && (
          <div className="row no-gutters d-flex justify-content-center">
            <div className="col-12 col-sm-7 d-none d-sm-block">
              <div className="card d-flex justify-content-center rounded-0 border-right-0 h-100">
                <img
                  src={props.post.image}
                  alt=""
                  className="rounded-0 img-fluid align-self-center"
                />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="card rounded-0 displayCard h-100">
                <div className="card-header bg-white p-3 d-block d-sm-none">
                  <img
                    src={props.post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link
                    to={`/users/${props.post.author.id}`}
                    className="feedLinks"
                  >
                    {props.post.author.username}
                  </Link>
                </div>
                <img
                  src={props.post.image}
                  alt=""
                  className="rounded-0 card-img-top d-block d-sm-none"
                />
                <div className="p-3 d-none d-sm-block">
                  <img
                    src={props.post.author.avatar}
                    alt=""
                    className="rounded-circle mr-2"
                    width="30px"
                    height="30px"
                  />
                  <Link
                    to={`/users/${props.post.author.id}`}
                    className="feedLinks"
                  >
                    {props.post.author.username}
                  </Link>
                  <hr />
                  {props.post.description && (
                    <div className="mt-1">
                      <Link
                        to={`/users/${props.post.author.id}`}
                        className="feedLinks"
                      >
                        {props.post.author.username}
                      </Link>{" "}
                      {props.post.description}
                    </div>
                  )}
                  <Comments
                    postId={props.post._id}
                    comments={props.post.comments}
                  />
                </div>
                <div className="p-3">
                  <Icons
                    authorId={props.post.author.id}
                    postId={props.post._id}
                    likes={props.post.likes}
                  />
                  <div>
                    <Link to="/" className="feedLinks">
                      {props.post.likes.length} likes
                    </Link>
                  </div>
                  <div className="d-block d-sm-none">
                    <Link
                      to={`/users/${props.post.author.id}`}
                      className="feedLinks"
                    >
                      {props.post.author.username}
                    </Link>{" "}
                    {props.post.description}
                  </div>
                  <div className="d-block d-sm-none">
                    <Comments
                      postId={props.post._id}
                      comments={props.post.comments}
                    />
                  </div>
                  <div>
                    <Link
                      to={`/posts/${props.post._id}`}
                      className="text-uppercase postDate"
                    >
                      {moment(props.post.timePosted).fromNow()}
                    </Link>
                  </div>
                  <hr />
                  <Comment postId={props.post._id} singlePost={true} />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DisplayPost;
