import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/authService";

export async function register(req: Request, res: Response) {
  console.log(req.body);

  try {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.status(201).send({ message: "User registered successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred" });
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).send({ error: error.message });
    } else {
      res.status(401).send({ error: "An unknown error occurred" });
    }
  }
}
