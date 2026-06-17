// post prefix aa call hole api ki kaj korbe sei function create kora

import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import imagekit from "../config/imagekit.js";
import notificationModel from "../models/notification.model.js";

// post create function
export async function createPost(req, res) {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "no file uploaded",
      });
    }

    const result = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/posts",
    });

    const post = await postModel.create({
      author: req.user.id,
      caption: req.body.caption,
      image: result.url,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
// get all posts function
export async function getAllPosts(req, res) {
  try {
    const posts = await postModel
      .find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
// get post by id function
export async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const post = await postModel
      .findById(id)
      .populate("author", "username avatar");

    if (!post) {
      return res.status(404).json({
        message: "post is not found",
      });
    }

    return res.status(200).json({
      message: "post retrived successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
// delete post function
export async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "unauthorized",
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
// like/unlike toggle function create
export async function toggleLike(req, res) {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    const userId = req.user.id;

    const isAlreadyLiked = post.likes.includes(userId);

    if (isAlreadyLiked) {
      post.likes.pull(userId);

      await post.save();

      return res.status(200).json({
        message: "post unliked",
        likescount: post.likes.length,
      });
    }

    post.likes.push(userId);

    await post.save();

    if (post.author.toString() !== userId) {
      await notificationModel.create({
        sender: userId,
        receiver: post.author,
        type: "like",
      });
    }

    return res.status(200).json({
      message: "post liked",
      likescount: post.likes.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
// create add comment function
export async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    if (!text) {
      return res.status(400).json({
        message: "comment text is required",
      });
    }

    const comment = {
      user: req.user.id,
      text,
    };

    post.comments.push(comment);

    await post.save();

    await post.populate("comments.user", "username avatar");

    if (post.author.toString() !== req.user.id) {
      await notificationModel.create({
        sender: req.user.id,
        receiver: post.author,
        post: post._id,
        type: "comment",
      });
    }

    return res.status(200).json({
      message: "comment added successfully",
      comments: post.comments,
      commentscount: post.comments.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function getFeed(req, res) {
  try {
    const currentUser = await userModel.findById(req.user.id);

    const posts = await postModel
      .find({
        author: {
          $in: [...currentUser.following, currentUser._id],
        },
      })
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Feed featched successfully",
      count: posts.length,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { caption, image } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (caption !== undefined) {
      post.caption = caption;
    }

    if (image !== undefined) {
      post.image = image;
    }

    await post.save();

    return res.status(200).json({
      message: "post updated successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function deleteComment(req, res) {
  try {
    const { postId, commentId } = req.params;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    const comment = await post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    comment.deleteOne();

    await comment.save();

    return res.status(200).json({
      message: "comment deleted successfully",
      commentscount: post.comments.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
