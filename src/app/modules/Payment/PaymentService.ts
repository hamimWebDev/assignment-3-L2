import { FacultyBooking } from "../BookingFaccility/BookingFaccilityModel";
import { verifyPayment } from "./Payment.utils";
import ejs from "ejs";
import { join } from "path";

const confirmationService = async (transactionId: string, status: string) => {
  try {
    const verifyResponse = await verifyPayment(transactionId);

    let paymentData;
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      // Update the payment status to "Paid" in the database
      await FacultyBooking.findOneAndUpdate(
        { transactionId },
        {
          paymentStatus: "Paid",
        },
      );

      // Prepare payment data for the confirmation template
      paymentData = {
        consumerName: verifyResponse?.cus_name,
        email: verifyResponse?.cus_email,
        phone: verifyResponse?.cus_phone,
        transactionId: verifyResponse?.mer_txnid,
        amount: verifyResponse?.amount,
        currency: "BDT",
        payment_type: verifyResponse?.payment_type,
        payTime: verifyResponse?.date,
        paymentStatus: verifyResponse?.pay_status,
      };
    }

    // Decide which template to render based on payment status
    const templatePath =
      status === "Success"
        ? join(process.cwd(), "/src/views/confrimation.ejs") // Fix the typo
        : join(process.cwd(), "/src/views/failded.ejs"); // Fix the typo
    
    const template = await ejs.renderFile(templatePath, paymentData || {});

    return template;
  } catch (error) {
    console.error("Error in confirmationService:", error);
    throw new Error(
      "An error occurred while processing the payment confirmation.",
    );
  }
};

export const paymentServices = {
  confirmationService,
};
