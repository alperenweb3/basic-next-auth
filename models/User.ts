// models/User.ts
import bcrypt from 'bcryptjs';
import connectToDatabase from 'lib/mongoose';
import mongoose, { Schema, Document, models, model } from 'mongoose';

// Define the User interface extending Mongoose's Document
interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

// Define the User schema using Mongoose
const UserSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model if it does not already exist
const User = models.User || model<IUser>('User', UserSchema);

// Function to create a new user
export async function createUser(email: string, password: string) {
  await connectToDatabase();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
}

// Function to find a user by email
export async function findUserByEmail(email: string) {
  await connectToDatabase();
  return await User.findOne({ email });
}

// Function to update user password
export async function updateUserPassword(email: string, newPassword: string) {
  await connectToDatabase();

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );
}

// Export the User model as the default export
export default User;
