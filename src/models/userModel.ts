import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let database: Database | null = null;

async function getDatabase() {
  if (!database) {
    database = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
  }
  return database;
}

// Fonction pour configurer la base de données
export async function setupDatabase(): Promise<void> {
  console.log("setupDatabase");

  const db = await getDatabase();
  try {
    console.log("Creating table if not exists..."); // Ajoutez un log
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Table created or already exists"); // Ajoutez un log
  } catch (error) {
    console.error("Error setting up database:", error); // Ajoutez un log
    throw new Error("Error setting up database");
  }
}

// Exporte les fonctions existantes
export async function getUserByUsername(username: string): Promise<any> {
  const db = await getDatabase();
  return db.get("SELECT * FROM users WHERE username = ?", [username]);
}

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
