const Post = require("../models/Post");

// create post
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      userId: req.user.id,
      title,
      description,
      statusHistory: [
        {
          status: "Open",
          changedBy: req.user.id,
          changedAt: new Date(),
        },
      ],
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");
    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update status of post
exports.updatePostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { status } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.status = status;
    post.statusHistory.push({
      status,
      changedBy: req.user.id,
      changedAt: new Date(),
    });
    post.updatedAt = new Date();

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description, status } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.status = status || post.status;
    post.updatedAt = new Date();

    if (status) {
      post.statusHistory.push({
        status,
        changedBy: req.user.id,
        changedAt: new Date(),
      });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
// Get a single post by postId
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get posts by userId
exports.getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");

    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get own posts
exports.getOwnPosts = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by your authentication middleware

    const posts = await Post.find({ userId })
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");

    res.json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id; // Assuming req.user is set by your authentication middleware

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Check if the post belongs to the user
    if (post.userId.toString() !== userId) {
      return res.status(403).send("Not authorized to delete this post");
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, name, role } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    post.comments.push({
      userId,
      text,
      name,
      role,
      createdAt: new Date(),
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get comments for a specific post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.userId",
      "name role"
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Return the comments array
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Post.find({
      "statusHistory.changedBy": userId,
      "statusHistory.status": { $in: ["Accepted", "Completed"] },
    })
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");

    res.json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a single order by orderId
exports.getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Post.findOne({
      _id: orderId,
      "statusHistory.changedBy": userId,
      "statusHistory.status": { $in: ["Accepted", "Completed"] },
    })
      .populate("userId", "name email")
      .populate("statusHistory.changedBy", "name email");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.json(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
