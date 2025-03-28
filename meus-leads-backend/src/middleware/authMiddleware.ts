import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const auth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string } & jwt.JwtPayload; 

    req.user = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido." });
  }
};

export default auth;
