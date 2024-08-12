import { Request, Response } from "express";
import { logger } from "../logger"; // Import the logger for error reporting

/**
 * Handles requests to the private content route.
 * This route is protected and requires authentication.
 * Responds with a 200 status and a success message if the request is valid.
 * Responds with a 500 status and an error message if an unexpected error occurs.
 */
export async function getPrivateContent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Simulate fetching and sending private content
    res.status(200).json({ message: "This is a private route" });
  } catch (error: unknown) {
    // Log the error for debugging
    if (error instanceof Error) {
      logger.error("Error fetching private content:", { error: error.message });
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error during fetching private content");
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
