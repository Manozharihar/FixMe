import { razorpay, hasRazorpayConfig, sendError, sendJson } from "./_config.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  if (!hasRazorpayConfig) {
    return sendError(res, 500, "Razorpay API keys are not configured");
  }

  try {
    const order = await razorpay.orders.create({
      amount: 100,
      currency: "INR",
      receipt: "test_connection",
    });

    return sendJson(res, 200, {
      success: true,
      message: "Razorpay connection successful",
      test_order_id: order.id,
    });
  } catch (err: any) {
    console.error("test-razorpay error:", err);
    return sendError(res, 500, err?.message || "Razorpay test failed");
  }
}
