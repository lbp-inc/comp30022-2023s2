import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isEmailVerified: {
      type: Boolean,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "tutor"],
      default: "user",
    },
    name: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
    },
    surname: {
      type: String,
    },
    gender: {
      type: String,
      require: true,
    },
    prefix: {
      type: String,
    },
    birthday: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    postcode: {
      type: String,
    },
    suburb: {
      type: String,
    },
    homePhone: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    emailVerificationCode: {
      type: String,
    },
    // Emergency Contact Details
    ecName: {
      type: String,
    },
    ecRelationship: {
      type: String,
    },
    ecPhone: {
      type: String,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
