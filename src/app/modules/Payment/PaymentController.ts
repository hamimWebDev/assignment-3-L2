import { catchAsync } from "../Utils/CatchAsync";
import { paymentServices } from "./PaymentService";

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
  );
  res.send(result);
});

export const PaymentControllers = {
  confirmationController,
};
