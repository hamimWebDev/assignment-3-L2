import express, { Request, Response } from "express";
import { router } from "./routes";

export const app = express();

//parsers
app.use(express.json());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Examiner!");
});
