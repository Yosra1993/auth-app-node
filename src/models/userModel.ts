import { User } from "../types/userTypes";
import { getDatabase } from "./database";

/**
 * Retrieves a user from the database by their username.
 * Queries the `users` table to find a user with the given username.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<User | undefined>} A promise that resolves to the user object if found, or `undefined` if not found.
 */

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
  const db = await getDatabase();
  return db.get<User>("SELECT * FROM users WHERE username = ?", [username]);
}

/**
 * Creates a new user in the database with the specified username and hashed password.
 * Inserts the user details into the `users` table.
 * @param {string} username - The username of the new user.
 * @param {string} hashedPassword - The hashed password of the new user.
 * @returns {Promise<void>} A promise that resolves when the user has been inserted into the database.
 * @throws {Error} Throws an error if there is an issue inserting the user into the database.
 */

export async function createUser(
  username: string,
  hashedPassword: string
): Promise<void> {
  const db = await getDatabase();
  try {
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
  } catch (error) {
    throw new Error("Error inserting user into the database");
  }
}
