import { Request, Response } from "express";
import { logger } from "../logger"; // Import the logger for error reporting

/**
 * Handles requests to the public content route.
 * This route is accessible without authentication.
 * Responds with a 200 status and a success message if the request is successful.
 * Responds with a 500 status and an error message if an unexpected error occurs.
 */
export async function getPublicContent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Simulate fetching and sending public content
    res.status(200).json({ message: "This is a public route" });
  } catch (error: unknown) {
    // Log the error for debugging
    if (error instanceof Error) {
      logger.error("Error fetching public content:", { error: error.message });
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error during fetching public content");
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
