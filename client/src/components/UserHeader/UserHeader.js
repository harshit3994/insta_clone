import React from "react";
import { Link } from "react-router-dom";
import "./UserHeader.css";

const UserHeader = props => {
  const user = JSON.parse(localStorage.getItem("Auth"));
  const checkIfFollowing = followers => {
    if (followers) {
      for (const follower of followers) {
        if (follower._id === user.id) {
          return true;
        }
      }
    }
  };
  return (
    <div className="container component">
      {props.user && (
        <div>
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col-sm-12 col-md-4 d-flex justify-content-center">
                <img
                  src={props.user.avatar}
                  alt=""
                  className="mr-5 rounded-circle mx-auto mb-3"
                  width="150"
                  height="150"
                />
              </div>
              <div className="col-sm-12 col-md-8">
                <span className="lead username">{props.user.username} </span>
                {props.user._id === user.id ? (
                  <Link
                    to={`/accounts/${props.user._id}/edit`}
                    className="ml-2 btn btn-sm btn-outline-dark"
                  >
                    <span className="ml-3 mr-3">Edit Profile</span>
                  </Link>
                ) : checkIfFollowing(props.user.followers) ? (
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
                <div className="d-flex mt-3">
                  <div className="mr-4">
                    <span className="headerLinks">
                      {props.posts && props.posts.length}{" "}
                    </span>
                    posts
                  </div>
                  <div className="mr-4">
                    <Link
                      to={`/users/${props.user._id}/followers`}
                      className="headerLinks"
                    >
                      {props.user.followers && props.user.followers.length}{" "}
                    </Link>
                    followers
                  </div>
                  <div className="mr-4">
                    <Link
                      to={`/users/${props.user._id}/following`}
                      className="headerLinks"
                    >
                      {props.user.following && props.user.following.length}{" "}
                    </Link>
                    following
                  </div>
                </div>
                <p className="mt-3">{props.user.bio}</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default UserHeader;
