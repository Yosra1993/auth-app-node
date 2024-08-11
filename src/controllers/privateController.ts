import { Request, Response } from "express";

export async function getPrivateContent(req: Request, res: Response) {
  try {
    res.status(200).send({ message: "This is a private route" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred" });
    }
  }
}
