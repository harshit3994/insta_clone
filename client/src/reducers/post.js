import {
  CREATE_POST,
  GET_FEED,
  GET_POST,
  ADD_COMMENT,
  ADD_COMMENT_SINGLE_POST,
  GET_COMMENT,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  DELETE_SINGLE_POST,
  DELETE_COMMENT,
  DELETE_COMMENT_SINGLE_POST,
  LIKE_SINGLE_POST,
  DISLIKE_SINGLE_POST,
  GET_POST_FOR_EDIT,
  POST_ERROR,
  COMMENT_ERROR
} from "../constants/action-types";

const initialState = {
  posts: [],
  post: {},
  editError: "",
  deletePostMsg: "",
  comment: "",
  postError: "",
  commentError: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return action.payload;
    case DELETE_POST:
      const newPostsDelete = state.posts.filter(
        item => item._id !== action.payload
      );
      return {
        posts: newPostsDelete
      };
    case DELETE_SINGLE_POST:
      return action.payload;
    case GET_FEED:
      return {
        posts: action.payload
      };
    case GET_POST_FOR_EDIT:
      return {
        post: action.payload
      };
    case GET_POST:
      return {
        post: action.payload
      };
    case POST_ERROR:
      return {
        postError: action.payload
      };
    case ADD_COMMENT:
      const newPostsComment = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments = [...post.comments, action.payload.comment];
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsComment
      };
    case ADD_COMMENT_SINGLE_POST:
      const commentSinglePost = state;
      return {
        ...commentSinglePost,
        post: {
          ...commentSinglePost.post,
          comments: [...commentSinglePost.post.comments, action.payload]
        }
      };
    case GET_COMMENT:
      return {
        comment: action.payload
      };
    case COMMENT_ERROR:
      return {
        commentError: action.payload
      };
    case DELETE_COMMENT:
      const newPostsDeleteComment = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments = post.comments.filter(
            item => item._id !== action.payload.commentId
          );
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsDeleteComment
      };
    case DELETE_COMMENT_SINGLE_POST:
      const deleteCommentSinglePost = state;
      return {
        ...deleteCommentSinglePost,
        post: {
          ...deleteCommentSinglePost.post,
          comments: deleteCommentSinglePost.post.comments.filter(
            comment => comment._id !== action.payload._id
          )
        }
      };
    case LIKE_POST:
      const newPostsLike = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.likes = [...post.likes, action.payload.like];
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsLike
      };
    case LIKE_SINGLE_POST:
      const likeSinglePost = state;
      return {
        ...likeSinglePost,
        post: {
          ...likeSinglePost.post,
          likes: [...likeSinglePost.post.likes, action.payload]
        }
      };
    case DISLIKE_POST:
      const newPostsDislike = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.likes = post.likes.filter(
            item => item._id !== action.payload.likeId
          );
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsDislike
      };
    case DISLIKE_SINGLE_POST:
      const dislikeSinglePost = state;
      return {
        ...dislikeSinglePost,
        post: {
          ...dislikeSinglePost.post,
          likes: dislikeSinglePost.post.likes.filter(
            like => like._id !== action.payload._id
          )
        }
      };
    default:
      return state;
  }
}
