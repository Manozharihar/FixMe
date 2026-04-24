import { collection, getDocs } from "firebase/firestore";
import { db, sendError, sendJson } from "./_config.js";

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { success: true });
  }
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    const snapshot = await getDocs(collection(db, "guides"));
    const guides = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return sendJson(res, 200, guides);
  } catch (error: any) {
    console.error("guides fetch failed:", error);
    return sendError(res, 500, "Failed to fetch guides");
  }
}
