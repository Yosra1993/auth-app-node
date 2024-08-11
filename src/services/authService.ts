import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserByUsername, createUser } from "../models/userModel";
import { config } from "../config";

export async function registerUser(username: string, password: string) {
  console.log(username, password);

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser(username, hashedPassword);
}

export async function authenticateUser(username: string, password: string) {
  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid username or password");
  }
  return jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: "1h",
  });
}
