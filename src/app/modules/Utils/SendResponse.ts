import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message?: string;
    token?: string;
    data: T;
  },
) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};
