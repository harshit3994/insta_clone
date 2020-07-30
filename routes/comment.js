const Post = require("../models/post");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const { checkCommentOwnership } = middleware;

module.exports = router => {
  // create comment
  router.post("/posts/:post_id/comments", (req, res) => {
    let newComment = {};
    Post.findOne({ _id: req.params.post_id })
      .then(post => {
        return Comment.create({ text: req.body.comment });
      })
      .then(comment => {
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        return (newComment = comment);
      })
      .then(result => {
        return Post.findOne({ _id: req.params.post_id })
          .populate("comments")
          .populate("likes");
      })
      .then(post => {
        post.comments.push(newComment);
        post.save();
        const data = {
          postId: post._id,
          comment: newComment
        };
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // comment edit route
  router.get(
    "/posts/:post_id/comments/:comment_id/edit",
    checkCommentOwnership,
    (req, res) => {
      Comment.findOne({ _id: req.params.comment_id })
        .then(comment => {
          res.json({ comment: comment.text });
        })
        .catch(err => {
          res.json({ message: "You don't have permission to do that!" });
        });
    }
  );

  // edit comment
  router.put(
    "/posts/:post_id/comments/:comment_id",
    checkCommentOwnership,
    (req, res) => {
      Comment.findOneAndUpdate(
        { _id: req.params.comment_id },
        { text: req.body.comment }
      )
        .then(comment => {
          return Comment.findOne({ _id: req.params.comment_id });
        })
        .then(comment => {
          res.json({
            comment: comment.text,
            message: "Successfully edited your comment!"
          });
        })
        .catch(err => {
          res.json({ message: "Error editing your comment" });
        });
    }
  );

  // delete comment
  router.delete(
    "/posts/:post_id/comments/:comment_id",
    checkCommentOwnership,
    (req, res) => {
      Post.findOneAndUpdate(
        { _id: req.params.post_id },
        { $pull: { comments: req.params.comment_id } }
      )
        .then(post => {
          return Comment.findOneAndRemove({ _id: req.params.comment_id });
        })
        .then(comment => {
          res.json({ message: "Deleted your comment" });
        })
        .catch(err => {
          res.json({ message: "Error deleting your comment" });
        });
    }
  );
};
