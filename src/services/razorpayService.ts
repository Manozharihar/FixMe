import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const razorpayService = {
  async createOrder(amount: number) {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
      }),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return response.json();
  },

  async verifyAndSavePayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    amount: number;
    items: any[];
  }) {
    // 1. Verify signature via backend
    const verifyRes = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const verification = await verifyRes.json();
    if (!verification.success) throw new Error("Payment verification failed");

    // 2. Save receipt to Firebase
    const receiptRef = await addDoc(collection(db, "receipts"), {
      userId: auth.currentUser?.uid || "anonymous",
      email: auth.currentUser?.email || "guest",
      orderId: paymentData.razorpay_order_id,
      paymentId: paymentData.razorpay_payment_id,
      amount: paymentData.amount,
      items: paymentData.items,
      status: "paid",
      createdAt: serverTimestamp(),
    });

    // 3. Trigger Email via Firebase Extension (Trigger Email from Firestore)
    // This assumes you have the "Trigger Email" extension configured to watch the 'mail' collection
    await addDoc(collection(db, "mail"), {
      to: auth.currentUser?.email,
      message: {
        subject: `Order Confirmation - ${paymentDataimport Razorpay from "razorpay";
import crypto from "crypto";

const key_id = process.env.RAZORPAY_KEY_ID!;
const key_secret = process.env.RAZORPAY_KEY_SECRET!;

// Validate environment variables
if (!key_id || key_id === 'rzp_live_SgaVF2fTLbh0mR') {
  console.error('❌ RAZORPAY_KEY_ID not properly configured');
}

if (!key_secret || key_secret === 'your_actual_razorpay_secret_key_here' || key_secret === 'YOUR_RAZORPAY_KEY_SECRET') {
  console.error('❌ RAZORPAY_KEY_SECRET not properly configured');
  throw new Error('Razorpay secret key not configured. Please set RAZORPAY_KEY_SECRET in your .env file');
}

export const razorpay = new Razorpay({
  key_id,
  key_secret,
});

export function verifySignature(order_id: string, payment_id: string, signature: string): boolean {
  try {
    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body)
      .digest("hex");
    
    const isValid = expectedSignature === signature;
    console.log('🔐 Payment signature verification:', isValid ? '✅ Valid' : '❌ Invalid');
    return isValid;
  } catch (error) {
    console.error('❌ Error verifying signature:', error);
    return false;
  }
}

// Test Razorpay connection
export async function testRazorpayConnection() {
  try {
    // Try to create a minimal order to test connection
    const testOrder = await razorpay.orders.create({
      amount: 100, // ₹1
      currency: "INR",
      receipt: "test_connection",
    });
    console.log('✅ Razorpay connection successful');
    return true;
  } catch (error: any) {
    console.error('❌ Razorpay connection failed:', error.message);
    return false;
  }
}
