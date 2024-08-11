import express from "express";
import authRoutes from "./routes/authRoutes";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import { config } from "./config";
import { setupDatabase } from "./models/userModel";

const app = express();

// Database setup before starting the server
setupDatabase()
  .then(() => {
    console.log("Database setup complete.");
  })
  .catch((error) => {
    console.error("Error setting up the database:", error);
    process.exit(1); // Exit if database setup fails
  });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", publicRoutes);
app.use("/api", privateRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
