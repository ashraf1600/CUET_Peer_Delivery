const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, postController.createPost);
router.get("/", postController.getPosts); // all post unauthorized
router.put("/:postId/status", auth, postController.updatePostStatus);
router.put("/:postId", auth, postController.updatePost); // Update a post
router.get("/:postId", auth, postController.getPostById); // Get a single post by postId
router.get("/user/:userId", auth, postController.getPostsByUserId); // Get posts by userId
router.get("/own/posts", auth, postController.getOwnPosts); // getting own all posts
router.delete("/:postId", auth, postController.deletePost); // delete own post
router.post("/:postId/comments", auth, postController.addComment); // adding comments
router.get("/:postId/comments", auth, postController.getComments); // New route for fetching comments

module.exports = router;
