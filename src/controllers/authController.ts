import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/authService";
import { registerSchema, loginSchema } from "../validation/validationSchemas";
import { logger } from "../logger";

/**
 * Handles user registration.
 * Expects `username` and `password` in the request body.
 * Validates the request body against `registerSchema` to ensure both fields are provided.
 * Responds with a 201 status and success message on successful registration.
 * Responds with a 400 status and an error message if validation fails or if registration fails.
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    // Validate request body using Joi schema
    const { error } = registerSchema.validate(req.body);
    if (error) {
      logger.warn("Invalid registration request:", { details: error.details });
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: unknown) {
    // Log the error for debugging
    if (error instanceof Error) {
      logger.error("Registration error:", { error: error.message });
      res.status(400).json({ error: error.message });
    } else {
      logger.error("Unknown error during registration");
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
}

/**
 * Handles user login.
 * Expects `username` and `password` in the request body.
 * Validates the request body against `loginSchema` to ensure both fields are provided.
 * Responds with a 200 status and a token on successful authentication.
 * Responds with a 401 status and an error message if validation fails or if authentication fails.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    // Validate request body using Joi schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.warn("Invalid login request:", { details: error.details });
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { username, password } = req.body;
    const token = await authenticateUser(username, password);
    res.status(200).json({ token });
  } catch (error: unknown) {
    // Log the error for debugging
    if (error instanceof Error) {
      logger.error("Login error:", { error: error.message });
      res.status(401).json({ error: error.message });
    } else {
      logger.error("Unknown error during login");
      res.status(401).json({ error: "An unknown error occurred" });
    }
  }
}
