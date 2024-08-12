import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserByUsername, createUser } from "../models/userModel";
import { config } from "../config";
import { logger } from "../logger"; // Import the logger

/**
 * Registers a new user by hashing their password and storing the user details.
 * @param {string} username - The username of the user to register.
 * @param {string} password - The password of the user to register.
 * @returns {Promise<void>} A promise that resolves when the user has been successfully created.
 * @throws {Error} Throws an error if the username or password is not provided.
 */
export async function registerUser(
  username: string,
  password: string
): Promise<void> {
  if (!username || !password) {
    logger.warn("Registration failed: Missing username or password.");
    throw new Error("Username and password are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword);
    logger.info("User registered successfully:", { username });
  } catch (error) {
    logger.error("Error registering user:", {
      username,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error("Error registering user");
  }
}

/**
 * Authenticates a user by comparing the provided password with the stored hashed password
 * and generating a JWT if authentication is successful.
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<string>} A promise that resolves to the JWT token if authentication is successful.
 * @throws {Error} Throws an error if the username or password is invalid.
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<string> {
  try {
    const user = await getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn("Authentication failed: Invalid username or password.", {
        username,
      });
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    logger.info("User authenticated successfully:", { username });
    return token;
  } catch (error) {
    logger.error("Error authenticating user:", {
      username,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error("Error authenticating user");
  }
}
