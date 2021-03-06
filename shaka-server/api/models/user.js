var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    fullName: {
      type: String
    },
    country: {
      type: String
    }
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);
module.exports = User;
