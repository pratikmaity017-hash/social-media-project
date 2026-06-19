// auth prefix aa call hole api ki kaj korbe sei function create kora

import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import postModel from "../models/post.model.js";
import imagekit from "../config/imagekit.js";
import notificationModel from "../models/notification.model.js";

// register the user.
export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyExist) {
      return res.status(409).json({
        message: "Username or email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// login the user
export async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// logout the user
export async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// // get current user data
// export async function getCurrentUser(req, res) {
//   try {
//     const user = await userModel.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     res.status(200).json({
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// }

// // create follow/unfollow toggle system
// export async function toggleFollow(req, res) {
//   try {
//     const targetUserId = req.params.id;
//     const currentUserId = req.user.id;

//     if (targetUserId === currentUserId) {
//       return res.status(401).json({
//         message: "You Can't Follow Yourself",
//       });
//     }

//     const currentUser = await userModel.findById(currentUserId);

//     const targetUser = await userModel.findById(targetUserId);

//     if (!targetUser) {
//       return res.status(401).json({
//         message: "user not found",
//       });
//     }

//     const isFollowing = currentUser.following.includes(targetUserId);

//     //advanced is following for fewer bugs in future

//     // const isFollowing = currentUser.following.some(
//     //   (id) => id.toString() === targetUserId,
//     // );

//     if (isFollowing) {
//       currentUser.following.pull(targetUserId);
//       targetUser.followers.pull(currentUserId);

//       await currentUser.save();
//       await targetUser.save();

//       return res.status(200).json({
//         message: "User Unfollow Successfully",
//         isFollowing: false,
//         followersCount: targetUser.followers.length,
//         followingCount: currentUser.following.length,
//       });
//     }

//     currentUser.following.push(targetUserId);
//     targetUser.followers.push(currentUserId);

//     await currentUser.save();
//     await targetUser.save();

//     await notificationModel.create({
//       sender: currentUser._id,
//       receiver: targetUser._id,
//       type: "follow",
//     });

//     return res.status(200).json({
//       message: "User Follow Successfully",
//       isFollowing: true,
//       followersCount: targetUser.followers.length,
//       followingCount: currentUser.following.length,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }
// // create user profile featch function
// export async function getUserProfile(req, res) {
//   try {
//     const { id } = req.params;
//     const user = await userModel.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         message: "user not found",
//       });
//     }

//     const postCount = await postModel.countDocuments({
//       author: id,
//     });

//     return res.status(200).json({
//       message: "Profile featched successfully",
//       user: {
//         _id: user._id,
//         username: user.username,
//         bio: user.bio,
//         avatar: user.avatar,
//         followersCount: user.followers.length,
//         followingCount: user.following.length,
//         postCount,
//       },
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }

// export async function updateProfile(req, res) {
//   try {
//     const { bio, avatar } = req.body;

//     const user = await userModel.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "user not found",
//       });
//     }

//     if (bio !== undefined) {
//       user.bio = bio;
//     }

//     if (avatar !== undefined) {
//       user.avatar = avatar;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }

// export async function searchUser(req, res) {
//   try {
//     const { username } = req.query;

//     if (!username) {
//       return res.status(404).json({
//         message: "username query is required",
//       });
//     }

//     const users = await userModel
//       .find({
//         username: {
//           $regex: username,
//           $options: "i",
//         },
//       })
//       .select("username avatar bio");

//     return res.status(200).json({
//       count: users.length,
//       users,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }

// export async function uploadAvatar(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "file is not uploaded",
//       });
//     }

//     const result = await imagekit.files.upload({
//       file: req.file.buffer.toString("base64"),
//       fileName: `${Date.now()}-${req.file.originalname}`,
//       folder: "/avatars",
//     });

//     const user = await userModel.findById(req.user.id);

//     user.avatar = result.url;

//     await user.save();

//     return res.status(200).json({
//       message: "avatar uploaded successfully",
//       avatar: result.url,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }

// export async function savePost(req, res) {
//   try {
//     const { postId } = req.params;

//     const user = await userModel.findById(req.user.id);

//     console.log(user.savedPosts);

//     const post = await postModel.findById(postId);

//     if (!post) {
//       return res.status(404).json({
//         message: "post is not found",
//       });
//     }

//     const isSaved = user.savedPosts.some((id) => id.toString() === postId);

//     if (isSaved) {
//       user.savedPosts.pull(postId);

//       await user.save();

//       return res.status(200).json({
//         message: "post unsaved successfully",
//         isSaved: false,
//       });
//     }

//     user.savedPosts.push(postId);

//     await user.save();

//     return res.status(200).json({
//       message: "post saved successfully",
//       isSaved: true,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }
