import bcrypt from 'bcryptjs';
import connectToDatabase from 'lib/mongoose';
import { Schema, Document, models, model } from 'mongoose';

// Define the User interface extending Mongoose's Document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  allowedPages: string[];
  role: string; // New property to define user roles (e.g., 'admin', 'user')
  createdAt: Date;
}

// Define the User schema using Mongoose
const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
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
  allowedPages: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    default: 'user', // Default role is 'user', admin users need to be set manually or via an admin panel
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>('User', UserSchema);

// Function to create a new user
export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string = 'user', // Default to 'user'
  allowedPages: string[] = [],
) {
  await connectToDatabase();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role, // Set user role
    allowedPages,
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
    { new: true },
  );
}

// Function to update user's allowed pages
export async function updateUserPages(email: string, allowedPages: string[]) {
  await connectToDatabase();
  return await User.findOneAndUpdate(
    { email },
    { allowedPages },
    { new: true },
  );
}

// Function to get all users
export async function getAllUsers() {
  await connectToDatabase();
  return await User.find({});
}

// Export the User model as the default export
export default User;
