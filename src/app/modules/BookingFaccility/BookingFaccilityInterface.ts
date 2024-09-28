import { Types } from "mongoose";

export type TBookedRole = "confirmed" | "canceled";

export interface TFacilityBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount?: number;
  isBooked?: TBookedRole;
  paymentStatus: string;
  transactionId: string;
}
