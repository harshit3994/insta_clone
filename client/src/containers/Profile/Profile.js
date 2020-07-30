import React, { Component } from "react";
import UserHeader from "../../components/UserHeader/UserHeader";
import UserPosts from "../../components/UserPosts/UserPosts";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/user";

const mapStateToProps = state => {
  return {
    user: state.user.user,
    posts: state.user.posts,
    visible: state.common.visible,
    loading: state.common.loading
  };
};

class Profile extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.getUserProfile(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.getUserProfile(this.props.match.params.userId);
    }
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          <div>
            <UserHeader
              user={this.props.user}
              follow={this.props.followUser}
              unfollow={this.props.unfollowUser}
            />
            <UserPosts
              posts={this.props.posts}
              visible={this.props.visible}
              hoverPost={this.props.hoverPost}
              unhoverPost={this.props.unhoverPost}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
