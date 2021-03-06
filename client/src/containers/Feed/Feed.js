import React, { Component } from "react";
import DisplayPosts from "../../components/DisplayPosts/DisplayPosts";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/post";

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.common.loading
  };
};

class Feed extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.getFeed();
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          <DisplayPosts posts={this.props.posts} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Feed);
