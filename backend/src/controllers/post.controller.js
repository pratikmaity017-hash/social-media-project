// post prefix aa call hole api ki kaj korbe sei function create kora

import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

// post create function
export async function createPost(req, res) {
  try {
    const { caption, image } = req.body;

    const post = await postModel.create({
      author: req.user.id,
      caption,
      image,
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

    post.save();

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

    return res.status(200).json({
      message: "comment added successfully",
      comment,
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
          $in: currentUser.following,
        },
      })
      .populate("author", "username avatar")
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

    const {id} = req.params
    const {caption , image} =req.body;

    const post = await postModel.findById(id)

    if(!post){
      return res.status(404).json({
        message: "post not found"
      })
    }

    if(post.author.toString() !== req.user.id){
      return res.status(403).json({
        message:"Unauthorized"
      })
    }

    if(caption !== undefined){
      post.caption = caption
    }

    if(image !== undefined){
      post.image = image
    }

    await post.save()

    return res.status(200).json({
      message:"post updated successfully",
      post,
    }
    )

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
