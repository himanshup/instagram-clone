import React from "react";
import { Link } from "react-router-dom";
import NewComment from "../../containers/NewComment/NewComment";
import Comments from "../../containers/Comments/Comments";
import Icons from "../../containers/Icons/Icons";
import PostAuthor from "../../containers/PostAuthor/PostAuthor";
import moment from "moment";
import "./DisplayPost.css";

const DisplayPost = props => {
  // const check = id => {
  //   if (props.following) {
  //     for (const user of props.following) {
  //       if (user._id === id) {
  //         return true;
  //       }
  //     }
  //   }
  // };
  return (
    <div className="container component">
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
                  <PostAuthor userId={props.post.author.id} />
                </div>
                <img
                  src={props.post.image}
                  alt=""
                  className="rounded-0 card-img-top d-block d-sm-none"
                />
                <div className="p-3 d-none d-sm-block">
                  <PostAuthor userId={props.post.author.id} />
                  {/* {check(props.post.author.id) ? (
                    <button
                      className="ml-2 btn btn-sm btn-outline-dark"
                      onClick={() => props.unfollow(props.post.author.id)}
                    >
                      <span className="">Unfollow</span>
                    </button>
                  ) : (
                    <button
                      className="ml-2 btn btn-sm btn-primary"
                      onClick={() => props.follow(props.post.author.id)}
                    >
                      <span className="">Follow</span>
                    </button>
                  )} */}
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
                  <div className="commentSection">
                    <Comments
                      postId={props.post._id}
                      comments={props.post.comments}
                      singlePost={true}
                    />
                  </div>
                </div>
                <div className="p-3 mt-auto">
                  <hr className="d-none d-sm-block" />
                  <Icons
                    authorId={props.post.author.id}
                    postId={props.post._id}
                    likes={props.post.likes}
                    singlePost={true}
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
                      singlePost={true}
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
                  <NewComment postId={props.post._id} singlePost={true} />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DisplayPost;
