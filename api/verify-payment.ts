import crypto from "crypto";
import { parseJsonBody, sendError, sendJson } from "./_config";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return sendError(res, 405, "Method not allowed");
  }

  const body = await parseJsonBody(req);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return sendError(res, 400, "Missing payment fields");
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return sendError(res, 400, "Signature mismatch");
  }

  return sendJson(res, 200, { success: true });
}
