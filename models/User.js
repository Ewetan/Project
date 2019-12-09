const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: "point"
    },
    coordinates: [
      {
        type: [Number],
        required: true
      }
    ],
    address: {
      type: String,
      required: true
    }
  },
  photo: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
