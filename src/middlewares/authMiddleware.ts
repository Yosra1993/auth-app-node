import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "../config";
import { User } from "../types/userTypes"; // Import the User type
import { logger } from "../logger";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Extract the authorization header from the request
  const authHeader = req.headers["authorization"];

  // Check if the authorization header is missing
  if (!authHeader) {
    logger.error("Authorization header missing");

    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Extract the token from the header (assuming 'Bearer <token>')
  const token = authHeader.split(" ")[1];

  // If no token is provided, send unauthorized status
  if (!token) {
    logger.error("Token missing from authorization header");
    return res
      .status(401)
      .json({ error: "Token missing from authorization header" });
  }

  // Verify the token using the secret key
  jwt.verify(
    token,
    config.jwtSecret,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        logger.error("Invalid or expired token", { error: err.message });
        res.status(403).json({ error: "Invalid or expired token" });
        return;
      }

      // Attach the user object to the request for further use
      (req as Request & { user?: User }).user = user as User;

      // Proceed to the next middleware or route handler
      next();
    }
  );
}
