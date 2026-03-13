import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      select: false,
    },

    profileImg: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },

    googleId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked", "inactive"],
      default: "active",
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    resetToken: {
      type: String,
      default: "",
      select: false,
    },
    expiryToken: {
      type: Date,
    },
    pendingPayments: [
      {
        paper: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Paper",
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        transactionId: {
          type: String,
        },
      },
    ],
    purchasedPapers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper",
      },
    ],
  },

  { timestamps: true },
);

userSchema.index({ isDeleted: 1, status: 1 });

const User = model("User", userSchema);

export default User;
