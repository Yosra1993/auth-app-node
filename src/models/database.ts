import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { config } from "../config";

let database: Database | null = null;

/**
 * Opens a connection to the SQLite database. If the connection has not been established yet,
 * it initializes the database connection.
 * @returns {Promise<Database>} The SQLite database connection instance.
 */

export async function getDatabase() {
  if (!database) {
    database = await open({
      filename: config.databaseUrl,
      driver: sqlite3.Database,
    });
  }
  return database;
}

/**
 * Sets up the database by creating the necessary tables if they do not already exist.
 * Specifically, it creates a `users` table with columns for `id`, `username`, and `password`.
 * Logs the process and handles any errors that occur during table creation.
 * @returns {Promise<void>} A promise that resolves when the table setup is complete.
 */

export async function setupDatabase(): Promise<void> {
  const db = await getDatabase();
  try {
    console.log("Creating table if not exists...");
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Table created or already exists");
  } catch (error) {
    console.error("Error setting up database:", error);
    throw new Error("Error setting up database");
  }
}
