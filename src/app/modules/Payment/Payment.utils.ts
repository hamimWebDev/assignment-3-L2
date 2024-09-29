import axios from "axios";
import config from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialPayment = async (paymentData: any) => {
  // Fetch dynamic exchange rate from a currency conversion API
  const exchangeRateResponse = await axios.get(
    `https://v6.exchangerate-api.com/v6/302eb4d9acf268aed805490e/latest/USD`,
  );

  const exchangeRateUSDToBDT = exchangeRateResponse.data.conversion_rates.BDT;

  // Calculate the amount in BDT
  const amountInBDT = paymentData.totalPrice * exchangeRateUSDToBDT;

  // Proceed with the payment request
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `https://assignment-3-l2-ten.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=Success`,
    fail_url: `https://assignment-3-l2-ten.vercel.app/api/payment/confirmation?status=Failed`,
    cancel_url: "https://venerable-daifuku-04f83a.netlify.app/",
    amount: Math.round(amountInBDT),
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: paymentData.customerPhone,
    type: "json",
  });

  return response.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: transactionId,
    },
  });
  return (await response).data;
};
