import express, { Request, Response } from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./app/modules/middlewares/globalErrorHandler";
import { notFount } from "./app/modules/middlewares/notFound";
import cookieParser from "cookie-parser";

export const app = express();

//parsers
app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Examiner!");
});
// global ErrorHandler
app.use(globalErrorHandler);

// not fount
app.use(notFount);
