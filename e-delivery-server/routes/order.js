const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../middlewares/auth");

// Get all orders for a user
router.get("/", auth, postController.getUserOrders);

// Get a single order by orderId
router.get("/:orderId", auth, postController.getSingleOrder);

module.exports = router;
