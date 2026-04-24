import { sendError, sendJson } from "./_config";

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { success: true });
  }
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    const response = await fetch('https://www.ifixit.com/api/2.0/categories');
    const data = await response.json();

    if (!response.ok) {
      return sendError(res, response.status, "iFixit API error");
    }

    return sendJson(res, 200, data);
  } catch (error: any) {
    console.error("iFixit categories failed:", error);
    return sendError(res, 500, "Failed to load iFixit categories");
  }
}