"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = setupDatabase;
exports.getUserByUsername = getUserByUsername;
exports.createUser = createUser;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let database = null;
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!database) {
            database = yield (0, sqlite_1.open)({
                filename: "./database.db",
                driver: sqlite3_1.default.Database,
            });
        }
        return database;
    });
}
// Fonction pour configurer la base de données
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield getDatabase();
        yield db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
    });
}
// Exporte les fonctions existantes
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield getDatabase();
        return db.get("SELECT * FROM users WHERE username = ?", [username]);
    });
}
function createUser(username, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield getDatabase();
        return db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
            username,
            hashedPassword,
        ]);
    });
}
