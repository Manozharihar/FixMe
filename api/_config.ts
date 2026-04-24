import dotenv from "dotenv";
import Razorpay from "razorpay";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json" assert { type: "json" };

dotenv.config();

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
export const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
export const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
export const hasRazorpayConfig = Boolean(razorpayKeyId && razorpayKeySecret);

export const razorpay = new Razorpay({
  key_id: razorpayKeyId || "",
  key_secret: razorpayKeySecret || "",
});

export function sendJson(res: any, status: number, payload: any) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.end(JSON.stringify(payload));
}

export function sendError(res: any, status: number, message: string) {
  return sendJson(res, status, { error: message });
}

export async function parseJsonBody(req: any) {
  if (req.body) {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) {
        return resolve({});
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}
