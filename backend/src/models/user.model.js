
// userSchema create korlam,
// jate kore database ki type ar data jabe ta database ka bollam ,
// jadi ai type ar data na jay tahole sata database nibe na.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
