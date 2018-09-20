import React from "react";
import { FiHeart, FiMessageCircle, FiBookmark } from "react-icons/fi";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Feed.css";

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    redirect: state.auth.redirectTo
  };
};

const Feed = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card feedCard rounded-0 mt-5">
            <div className="card-header bg-white p-3">
              <img
                src="https://scontent-lax3-1.cdninstagram.com/vp/dbfa056778efd7f9541d1adf95e336e0/5C34A0D8/t51.2885-19/s150x150/32273597_602620126768471_760088673134837760_n.jpg"
                alt=""
                className="rounded-circle mr-2"
                width="30px"
                height="30px"
              />
              <a href="/" className="feedLinks">
                m6bmw
              </a>
            </div>
            <img
              src="https://img.buzzfeed.com/buzzfeed-static/static/enhanced/web05/2012/4/23/15/enhanced-buzz-29468-1335207936-2.jpg?downsize=715:*&output-format=auto&output-quality=auto"
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
                <a href="/" className="feedLinks">
                  428 likes
                </a>
              </div>
              <div className="mt-1">
                <a href="/" className="feedLinks">
                  m6bmw
                </a>{" "}
                親子丼🍚410円
              </div>
              <div className="">
                <span className="text-uppercase postDate">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  actions
)(Feed);
