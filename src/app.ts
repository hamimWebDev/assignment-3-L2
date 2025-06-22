import express, { Request, Response } from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./app/modules/middlewares/globalErrorHandler";
import { notFount } from "./app/modules/middlewares/notFound";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-5-l2-coral.vercel.app",
    ],
    credentials: true,
  }),
);

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Examiner!");
});

// global ErrorHandler
app.use(globalErrorHandler);

// not fount
app.use(notFount);
