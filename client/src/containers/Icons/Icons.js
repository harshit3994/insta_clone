import React, { Component } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/post";

class Icons extends Component {
  handleLike = () => {
    this.props.likePost(this.props.postId, this.props.singlePost);
  };

  handleDislike = like => {
    this.props.dislikePost(this.props.postId, like, this.props.singlePost);
  };

  handleDeletePost = () => {
    this.props.deletePost(this.props.postId, this.props.singlePost);
  };

  renderHeart = () => {
    const user = JSON.parse(localStorage.getItem("Auth"));

    if (this.props.likes.length === 0) {
      return (
        <span>
          <Icon.Heart
            className="mr-2 feedIcons"
            onClick={() => this.handleLike()}
          />
        </span>
      );
    }

    if (this.props.likes.length !== 0) {
      for (const like of this.props.likes) {
        if (like._id === user.id) {
          return (
            <span>
              <Icon.Heart
                className="mr-2 feedIcons"
                color="red"
                fill="red"
                onClick={() => this.handleDislike(like)}
              />
            </span>
          );
        }
      }
      for (const like of this.props.likes) {
        if (like._id !== user.id) {
          return (
            <span>
              <Icon.Heart
                className="mr-2 feedIcons"
                onClick={() => this.handleLike()}
              />
            </span>
          );
        }
      }
    }
  };

  render() {
    return (
      <div>
        {this.renderHeart()}
        <Icon.MessageCircle className="mr-2 feedIcons msgCircle" />
        {this.props.authorId === JSON.parse(localStorage.getItem("Auth")).id ? (
          <span>
            <Icon.Trash2
              className="feedIcons float-right"
              onClick={() => this.handleDeletePost()}
            />
            <Link to={`/edit/posts/${this.props.postId}`}>
              <Icon.Edit2 className="feedIcons text-dark float-right mr-2" />
            </Link>
          </span>
        ) : (
          <Icon.Bookmark className="feedIcons float-right" />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Icons);
