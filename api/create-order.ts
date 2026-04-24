import { razorpay, hasRazorpayConfig, parseJsonBody, sendError, sendJson } from "./_config.js";

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { success: true });
  }
  if (req.method !== "POST") {
    return sendError(res, 405, "Method not allowed");
  }

  if (!hasRazorpayConfig) {
    return sendError(res, 500, "Razorpay API keys are not configured");
  }

  try {
    const body = await parseJsonBody(req);
    const { amount, currency = "INR", receipt } = body;

    if (!amount || amount < 100) {
      return sendError(res, 400, "Amount must be at least 100 paise (₹1)");
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return sendJson(res, 200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error("create-order error:", err);
    if (err?.statusCode === 401) {
      return sendError(res, 401, "Razorpay authentication failed - check your API keys");
    }
    if (err?.statusCode === 400) {
      return sendError(res, 400, "Invalid order parameters");
    }
    return sendError(res, 500, "Failed to create order: " + (err?.message || "Unknown error"));
  }
}
