import { doc, getDoc } from "firebase/firestore";
import { db, sendError, sendJson } from "../_config.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  const id = req.query?.id || req.params?.id;
  if (!id) {
    return sendError(res, 400, "Guide ID is required");
  }

  try {
    const snapshot = await getDoc(doc(db, "guides", String(id)));
    if (!snapshot.exists()) {
      return sendError(res, 404, "Guide not found");
    }

    return sendJson(res, 200, {
      id: snapshot.id,
      ...snapshot.data(),
    });
  } catch (error: any) {
    console.error("guide fetch failed:", error);
    return sendError(res, 500, "Failed to fetch guide");
  }
}
