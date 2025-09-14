import mongoose, { Document, Model, Types } from "mongoose";
import bcrypt from "bcrypt";

// 1. Interface untuk user document
export interface IUser extends Document {
  _id: Types.ObjectId
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;

  // method custom
  comparePassword(password: string): Promise<boolean>;
}

// 2. Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

// 3. Pre-save hook untuk hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

// 4. Method untuk compare password
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// 5. Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
